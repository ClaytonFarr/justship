import { PUBLIC_PRODUCT_NAME } from '$env/static/public'
import type { Seo } from '$lib/types'

export const load = async () => {
  const seo: Seo = {
    pageTitle: `${PUBLIC_PRODUCT_NAME} | Terms of Service`,
    pageDescription: `The terms of service for ${PUBLIC_PRODUCT_NAME}`,
  }
  return { seo }
}
