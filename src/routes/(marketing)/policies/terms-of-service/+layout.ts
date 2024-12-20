import { PUBLIC_PRODUCT_NAME } from '$env/static/public'
import type { Meta } from '$lib/meta'

export const load = async () => {
  const meta: Meta = {
    title: `${PUBLIC_PRODUCT_NAME} · Terms of Service`,
    description: `The terms of service for ${PUBLIC_PRODUCT_NAME}`,
  }
  return { meta }
}
