import { dev } from '$app/environment'
import { STRIPE_FREE_PLAN_PRICE_ID, STRIPE_FREE_PLAN_PRICE_ID_TEST } from '$env/static/private'
import { error } from '@sveltejs/kit'
import { lucia } from '$lib/server/auth/auth'
import { isWithinExpirationDate } from 'oslo'
import { deleteEmailToken, getEmailToken } from '$lib/server/database/emailtoken.model'
import { getUserById, updateUser } from '$lib/server/database/user.model'
import { createStripeCustomer, subscribeCustomerToPlan } from '$lib/server/stripe'

const stripe_free_plan_id = dev ? STRIPE_FREE_PLAN_PRICE_ID_TEST : STRIPE_FREE_PLAN_PRICE_ID

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
  await updateUser(user.id, { email_verified: true, last_sign_in: new Date() })

  const session = await lucia.createSession(user.id, {})
  const sessionCookie = lucia.createSessionCookie(session.id)

  // Create Stripe customer
  try {
    const stripeCustomer = await createStripeCustomer(user.email.toLowerCase())
    // Subscribe customer to free plan
    await subscribeCustomerToPlan(stripeCustomer.id, stripe_free_plan_id)
    // Update user with Stripe customer ID
    await updateUser(user.id, { stripe_customer_id: stripeCustomer.id, current_plan_id: stripe_free_plan_id })
  } catch (stripeError) {
    console.error('Error creating Stripe customer:', stripeError)
    // Consider whether to delete the user if Stripe customer creation fails
    // await deleteUser(userId)
    throw error(500, 'Failed to set up payment information.')
  }

  return new Response(null, {
    status: 302,
    headers: {
      location: '/app',
      'Set-Cookie': sessionCookie.serialize(),
    },
  })
}
