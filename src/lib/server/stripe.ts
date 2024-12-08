import Stripe from 'stripe'
import { STRIPE_SECRET_KEY } from '$env/static/private'

export const stripeClient = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2024-11-20.acacia',
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
