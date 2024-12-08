import { PUBLIC_PRODUCT_NAME } from '$env/static/public'
import type { Meta } from '$lib/meta'
export const load = async () => {
  const meta: Meta = {
    title: `${PUBLIC_PRODUCT_NAME} · Sign In`,
    description: `The sign in page for ${PUBLIC_PRODUCT_NAME}`,
  }
  return { meta }
}
