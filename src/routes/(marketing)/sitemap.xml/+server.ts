import * as sitemap from 'super-sitemap'
import { PUBLIC_ORIGIN } from '$env/static/public'
import type { RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async () => {
  return await sitemap.response({
    origin: PUBLIC_ORIGIN,
    excludeRoutePatterns: ['^/stripe/.*', '.*\\(login\\).*'],
  })
}
