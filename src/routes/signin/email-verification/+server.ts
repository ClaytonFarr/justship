import { error } from '@sveltejs/kit'
import { lucia } from '$lib/server/auth/auth'
import { isWithinExpirationDate } from 'oslo'
import { deleteEmailToken, getEmailToken } from '$lib/server/database/emailtoken.model'
import { getUserById, updateUser } from '$lib/server/database/user.model'

export async function GET({ request }): Promise<Response> {
  const verificationToken = new URL(request.url).searchParams.get('verification_token')
  if (!verificationToken) {
    console.log('No verification code provided')
    throw error(400, 'No verification code provided')
  }

  const email_token = await getEmailToken(verificationToken)

  if (email_token) {
    deleteEmailToken(verificationToken)
  }

  if (!email_token || !isWithinExpirationDate(email_token.expires_at)) {
    console.error('Invalid or expired email verification code.')
    throw error(400, 'Invalid or expired verification code.')
  }

  const user = await getUserById(email_token.user_id)
  if (!user || user.email !== email_token.email) {
    console.error('Invalid user or email mismatch.', user, email_token)
    throw error(400, 'Invalid user or email mismatch.')
  }

  await lucia.invalidateUserSessions(user.id)
  await updateUser(user.id, { email_verified: true })

  const session = await lucia.createSession(user.id, {})
  const sessionCookie = lucia.createSessionCookie(session.id)

  return new Response(null, {
    status: 302,
    headers: {
      location: '/app',
      'Set-Cookie': sessionCookie.serialize(),
    },
  })
}
