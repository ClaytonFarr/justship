import { dev } from '$app/environment'
import { env } from '$env/dynamic/private'
import { env as public_env } from '$env/dynamic/public'
import { PUBLIC_ORIGIN } from '$env/static/public'
import { error, fail, redirect } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'
import { z } from 'zod'
import { lucia } from '$lib/server/auth'
import { generateIdFromEntropySize } from 'lucia'
import { Argon2id } from 'oslo/password'
import { loginEmailHtmlTemplate, sendEmail } from '$lib/server/email/email.js'
import { createEmailVerificationToken, deleteAllEmailTokensForUser } from '$lib/server/database/emailtoken.model.js'
import { createNewUser, getUserByEmail } from '$lib/server/database/user.model.js'
import { createSignin, getSignins } from '$lib/server/database/signin.model'
import type { Actions } from './$types'

// Name has a default value just to display something in the form.
const schema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(8).max(255),
})

export const load = async (e) => {
  const form = await superValidate(zod(schema))
  return { form, user: e.locals.user }
}

export const actions: Actions = {
  signup_with_email: async ({ request, cookies }) => {
    const form = await superValidate(request, zod(schema))

    if (!form.valid) {
      return fail(400, { form })
    }

    const { email, password } = form.data
    const normalizedEmail = email.toLowerCase()

    // Check if user already exists
    const existingUser = await getUserByEmail(normalizedEmail)
    if (existingUser) {
      form.errors.email = ['Email already in use']
      return fail(400, { form })
    }
    if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
      form.errors.password = ['Password must be between 6 and 255 characters']
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
      throw error(500, 'Failed to create new user')
    }

    const session = await lucia.createSession(userId, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    cookies.set(sessionCookie.name, sessionCookie.value, {
      path: '.',
      ...sessionCookie.attributes,
    })

    // Send verification email
    await sendVerificationEmail(user)

    redirect(302, '/app')
  },

  login_with_email: async ({ request, cookies, getClientAddress }) => {
    const form = await superValidate(request, zod(schema))

    if (!form.valid) {
      return fail(400, { form })
    }

    const { email, password } = form.data

    const user = await getUserByEmail(email)
    if (!user || !user.password_hash) {
      form.errors.email = ['Incorrect email or password']
      return fail(400, { form })
    }

    const validPassword = await new Argon2id().verify(user.password_hash, password)
    if (!validPassword) {
      form.errors.password = ['Incorrect email or password']
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
      form.errors.email = ['Too many signins from this IP address in the last hour, please try again later']
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
    })

    // If email is not verified, send verification email
    if (!user.email_verified) {
      await sendVerificationEmail(user)
    }

    redirect(302, '/app')
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
    redirect(302, '/')
  },
}

async function sendVerificationEmail(user: { id: string; username: string; password_hash: string | null; email: string; email_verified: boolean | null }) {
  await deleteAllEmailTokensForUser(user.id)
  const verification_token = await createEmailVerificationToken(user.id, user.email)
  const verificationLink = `${PUBLIC_ORIGIN}/login/email-verification?verification_token=${verification_token}`

  await sendEmail({
    from: `${public_env.PUBLIC_PROJECT_NAME} <${env.FROM_EMAIL}>`,
    to: user.email,
    subject: `Your activation link for ${public_env.PUBLIC_PROJECT_NAME}`,
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
