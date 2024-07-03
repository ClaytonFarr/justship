import { redirect } from '@sveltejs/kit'
import { lucia } from '$lib/server/auth/auth'
import { sendVerificationEmail } from '$lib/server/email/email'
import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
  // Session handling
  const sessionId = event.cookies.get(lucia.sessionCookieName)

  if (!sessionId) {
    event.locals.user = null
    event.locals.session = null

    // redirect to /signin if the route starts with /app
    if (event.url.pathname.startsWith('/app') && !event.url.pathname.startsWith('/password-reset')) {
      throw redirect(302, '/signin')
    }

    return resolve(event)
  }

  const { session, user } = await lucia.validateSession(sessionId)

  if (session && session.fresh) {
    const sessionCookie = lucia.createSessionCookie(session.id)
    // Preserve the original maxAge when refreshing the session
    const originalCookie = event.cookies.get(lucia.sessionCookieName, { decode: (value) => value })
    const originalMaxAge = originalCookie
      ?.split(';')
      .find((part) => part.trim().startsWith('Max-Age='))
      ?.split('=')[1]
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: '.',
      ...sessionCookie.attributes,
      maxAge: originalMaxAge ? parseInt(originalMaxAge) : undefined,
    })
  }

  if (!session) {
    const sessionCookie = lucia.createBlankSessionCookie()
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: '.',
      ...sessionCookie.attributes,
    })

    // redirect to /signin if the route starts with /app
    if (event.url.pathname.startsWith('/app')) {
      throw redirect(302, '/signin')
    }
  } else {
    if (user && !user.emailVerified) {
      if (event.url.pathname.startsWith('/app')) {
        // resend verification email
        await sendVerificationEmail({
          id: user.id,
          username: user.username,
          email: user.email,
          email_verified: user.emailVerified,
        })
        throw redirect(302, '/signin?error=email_not_verified')
      }
    } else if (event.url.pathname === '/signin' && !event.url.searchParams.has('signout')) {
      throw redirect(302, '/app')
    }
  }

  event.locals.user = user
  event.locals.session = session

  return resolve(event)
}
