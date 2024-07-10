import Stripe from 'stripe'

import { STRIPE_SECRET_KEY, STRIPE_SECRET_KEY_TEST } from '$env/static/private'

const api_key = import.meta.env.PROD ? STRIPE_SECRET_KEY : STRIPE_SECRET_KEY_TEST

export const stripeClient = new Stripe(api_key, {
  apiVersion: '2024-06-20',
  httpClient: Stripe.createFetchHttpClient(),
})

export async function createStripeCustomer(email: string) {
  return await stripeClient.customers.create({ email })
}

export async function subscribeCustomerToPlan(customerId: string, priceId: string) {
  return await stripeClient.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
  })
}