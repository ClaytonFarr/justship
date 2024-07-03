import { dev } from '$app/environment'
import { env } from '$env/dynamic/private'
import { env as public_env } from '$env/dynamic/public'
import { PUBLIC_ORIGIN } from '$env/static/public'
import { error, fail, redirect } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'
import { z } from 'zod'
import { lucia } from '$lib/server/auth/auth'
import { generateIdFromEntropySize } from 'lucia'
import { Argon2id } from 'oslo/password'
import { loginEmailHtmlTemplate, sendEmail, sendPasswordResetLink } from '$lib/server/email/email'
import { createEmailVerificationToken, deleteAllEmailTokensForUser } from '$lib/server/database/emailtoken.model'
import { createNewUser, getUserByEmail } from '$lib/server/database/user.model'
import { createSignin, getSignins } from '$lib/server/database/signin.model'
import { generatePasswordResetToken } from '$lib/server/auth/resettoken'
import type { Actions, PageServerLoad } from './$types'

// Name has a default value just to display something in the form.
const schema = z.object({
  email: z.string().trim().email({ message: 'Invalid email address.' }),
  password: z.string().min(8, { message: 'Password must be 8 or more characters.' }).max(255),
  remember_me: z.boolean().optional(),
  signin_error_message: z.string().optional(),
  signup_error_message: z.string().optional(),
  reset_error_message: z.string().optional(),
})

export const load: PageServerLoad = async (e) => {
  const form = await superValidate(zod(schema))
  return { form, user: e.locals.user }
}

export const actions: Actions = {
  signup_with_email: async ({ request }) => {
    const form = await superValidate(request, zod(schema))

    if (!form.valid) {
      return fail(400, { form })
    }

    const { email, password } = form.data
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
    })

    if (!user) {
      throw error(500, 'Failed to create new user.')
    }

    // Send verification email
    await sendVerificationEmail(user)

    // Return success status without redirecting
    return {
      form,
      success: true,
      message: 'Signup successful. Please check your email for verification.',
    }
  },

  login_with_email: async ({ request, cookies, getClientAddress }) => {
    const form = await superValidate(request, zod(schema))

    if (!form.valid) {
      return fail(400, { form })
    }

    const { email, password, remember_me } = form.data

    const user = await getUserByEmail(email)
    if (!user || !user.password_hash) {
      form.errors.signin_error_message = ['Sign in failed - please check email and password.']
      return fail(400, { form })
    }

    // If email is not verified, send verification email
    if (!user.email_verified) {
      form.errors.signin_error_message = ['Please verify your email address to sign in.']
      await sendVerificationEmail(user)
      return fail(400, { form })
    }

    const validPassword = await new Argon2id().verify(user.password_hash, password)
    if (!validPassword) {
      form.errors.signin_error_message = ['Sign in failed - please check email and password.']
      return fail(400, { form })
    }

    // wait for 2 seconds to simulate a slow login
    if (dev) {
      await new Promise((resolve) => setTimeout(resolve, 2000))
    }

    // Rate limiting
    const ip_address = getClientAddress()
    const signins = await getSignins({ email, ip_address })
    const ratelimit = env.SIGNIN_IP_RATELIMIT ? parseInt(env.SIGNIN_IP_RATELIMIT) : 20

    if (signins.length > ratelimit) {
      form.errors.signin_error_message = ['Too many signins from this IP address in last hour, please try again later.']
      return fail(429, { form })
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

    redirect(302, `${PUBLIC_ORIGIN}/app`)
  },

  request_password_reset: async ({ request }) => {
    const form = await superValidate(request, zod(schema))

    if (!form.valid) {
      return fail(400, { form })
    }

    const { email } = form.data
    const user = await getUserByEmail(email)

    if (user) {
      const token = await generatePasswordResetToken(user.id)
      await sendPasswordResetLink(user.email, token)
    }

    return { form }
  },

  signout: async (e) => {
    if (!e.locals.session) {
      return fail(401)
    }
    await lucia.invalidateSession(e.locals.session.id)
    const sessionCookie = lucia.createBlankSessionCookie()
    e.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: '.',
      ...sessionCookie.attributes,
    })
    redirect(302, `${PUBLIC_ORIGIN}/`)
  },
}

async function sendVerificationEmail(user: { id: string; username: string; password_hash: string | null; email: string; email_verified: boolean | null }) {
  await deleteAllEmailTokensForUser(user.id)
  const verification_token = await createEmailVerificationToken(user.id, user.email)
  const verificationLink = `${PUBLIC_ORIGIN}/login/email-verification?verification_token=${verification_token}`

  await sendEmail({
    from: `${public_env.PUBLIC_PROJECT_NAME} <${env.FROM_EMAIL}>`,
    to: user.email,
    subject: `Activation link for ${public_env.PUBLIC_PROJECT_NAME}`,
    html: loginEmailHtmlTemplate({
      product_url: PUBLIC_ORIGIN,
      product_name: public_env.PUBLIC_PROJECT_NAME,
      action_url: verificationLink,
    }),
    headers: {
      'X-Entity-Ref-ID': generateIdFromEntropySize(16),
    },
  })
}
