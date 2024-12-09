import { dev } from '$app/environment'
import { env } from '$env/dynamic/private'
import { PUBLIC_ORIGIN, PUBLIC_SIGNUP_ENABLED } from '$env/static/public'
import { error, fail, redirect } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'
import { z } from 'zod'
import { lucia } from '$lib/server/auth/auth'
import { generateIdFromEntropySize } from 'lucia'
import { Argon2id } from 'oslo/password'
import { sendPasswordResetLink, sendVerificationEmail } from '$lib/server/email/email'
import { createNewUser, getUserByEmail, updateUser } from '$lib/server/database/user.model'
import { createResetAttempt, getResetAttempts } from '$lib/server/database/resetattempts.model'
import { createSignin, getSignins } from '$lib/server/database/signin.model'
import { generatePasswordResetToken } from '$lib/server/auth/resettoken'
import type { Actions, PageServerLoad } from './$types'

const rootUrl = dev ? 'http://localhost:5173' : PUBLIC_ORIGIN

const schema = z.object({
  email: z.string().trim().email({ message: 'Invalid email address.' }),
  password: z.string().min(8, { message: 'Password must be 8 or more characters.' }).max(255),
  remember_me: z.boolean().optional(),
  signin_error_message: z.string().optional(),
  signup_error_message: z.string().optional(),
  receive_product_updates: z.boolean().optional(),
})
const resetPasswordSchema = z.object({
  email: z.string().trim().email({ message: 'Invalid email address.' }),
  reset_error_message: z.string().optional(),
})

export const load: PageServerLoad = async (e) => {
  const form = await superValidate(zod(schema))
  const error = e.url.searchParams.get('error')
  const isNewUser = e.url.searchParams.has('new')
  
  // If signup is disabled and user tries to access with ?new, redirect to signin
  if (isNewUser && PUBLIC_SIGNUP_ENABLED !== 'true') {
    redirect(302, `${rootUrl}/signin`)
  }
  
  return { form, user: e.locals.user, error, isNewUser }
}

export const actions: Actions = {
  signup_with_email: async ({ request }) => {
    // Block signup if disabled
    if (PUBLIC_SIGNUP_ENABLED !== 'true') {
      throw error(403, 'Signup is currently disabled')
    }

    const form = await superValidate(request, zod(schema))

    if (!form.valid) {
      return fail(400, { form })
    }

    const { email, password, receive_product_updates } = form.data
    const normalizedEmail = email.toLowerCase()

    // Check if user already exists
    const existingUser = await getUserByEmail(normalizedEmail)
    if (existingUser) {
      form.errors.signup_error_message = ['Email address already in use.']
      return fail(400, { form })
    }
    if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
      form.errors.signup_error_message = ['Password must be between 6 and 255 characters.']
      return fail(400, { form })
    }

    // wait for 2 seconds to simulate a slow sign up
    if (dev) {
      await new Promise((resolve) => setTimeout(resolve, 2000))
    }

    const userId = generateIdFromEntropySize(10) // 16 characters long
    const passwordHash = await new Argon2id().hash(password)

    const user = await createNewUser({
      id: userId,
      email: normalizedEmail,
      username: normalizedEmail, // Using email as username
      email_verified: false,
      password_hash: passwordHash,
      receive_product_updates: receive_product_updates ?? false,
      created_at: new Date(),
      updated_at: new Date(),
      last_sign_in: undefined,
    })

    if (!user) {
      throw error(500, 'Failed to create new user.')
    }

    // Send verification email
    await sendVerificationEmail(user)

    // Return success status without redirecting
    return {
      form,
      signup_email_sent: true,
    }
  },

  signin_with_email: async ({ request, cookies, getClientAddress }) => {
    const form = await superValidate(request, zod(schema))

    if (!form.valid) {
      return fail(400, { form })
    }

    const { email, password, remember_me } = form.data

    // Rate limiting for sign-ins
    const ip_address = getClientAddress()
    const signins = await getSignins({ email, ip_address })
    const ratelimit = env.SIGNIN_IP_RATELIMIT ? parseInt(env.SIGNIN_IP_RATELIMIT) : 20

    if (signins.length > ratelimit) {
      form.errors.signin_error_message = ['Too many signins from this IP address in last hour, please try again later.']
      return fail(429, { form })
    }

    const user = await getUserByEmail(email)
    if (!user || !user.password_hash) {
      form.errors.signin_error_message = ['Sign in failed - please check email and password.']
      return fail(400, { form })
    }

    // If email is not verified, send verification email
    if (!user.email_verified) {
      form.errors.signin_error_message = ['Check your inbox to verify your account email.']
      await sendVerificationEmail(user)
      return fail(400, { form })
    }

    const validPassword = await new Argon2id().verify(user.password_hash, password)
    if (!validPassword) {
      form.errors.signin_error_message = ['Sign in failed - please check email and password.']
      return fail(400, { form })
    }

    // wait for 2 seconds to simulate a slow sign in
    if (dev) {
      await new Promise((resolve) => setTimeout(resolve, 2000))
    }

    await createSignin({
      email: email,
      ip_address,
      logged_in_at: new Date(),
    })

    const session = await lucia.createSession(user.id, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    cookies.set(sessionCookie.name, sessionCookie.value, {
      path: '.',
      ...sessionCookie.attributes,
      // If remember_me is true, set maxAge to 15 days, otherwise use the default (session)
      maxAge: remember_me ? 60 * 60 * 24 * 15 : undefined,
    })

    await updateUser(user.id, { last_sign_in: new Date() })

    redirect(302, `${rootUrl}/app`)
  },

  request_password_reset: async ({ request, getClientAddress }) => {
    const form = await superValidate(request, zod(resetPasswordSchema))

    if (!form.valid) {
      return fail(400, { form })
    }

    const { email } = form.data

    // Rate limiting for password resets
    const ip_address = getClientAddress()
    const resets = await getResetAttempts({ email, ip_address })
    const ratelimit = env.PASSWORD_RESET_RATELIMIT ? parseInt(env.PASSWORD_RESET_RATELIMIT) : 5

    if (resets.length > ratelimit) {
      form.errors.reset_error_message = ['Too many password reset attempts in last hour, please try again later.']
      return fail(429, { form })
    }

    // Track this reset attempt
    await createResetAttempt({ email, ip_address })

    const user = await getUserByEmail(email)
    if (user) {
      const token = await generatePasswordResetToken(user.id)
      await sendPasswordResetLink(user.email, token)
    }

    // Always return success to frontend, even if the email doesn't exist
    return {
      form,
      reset_email_sent: true,
    }
  },
}
