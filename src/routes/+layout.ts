import posthog from 'posthog-js'
import { browser, dev } from '$app/environment'
import {
  PUBLIC_DEFAULT_SEO_DESCRIPTION,
  PUBLIC_DEFAULT_SEO_TITLE,
  PUBLIC_ORIGIN,
  PUBLIC_POSTHOG_KEY,
} from '$env/static/public'
import type { DefaultSeo } from '$lib/types'

const rootUrl = dev ? 'http://localhost:5173' : PUBLIC_ORIGIN

export const load = async () => {
  if (browser && !dev) {
    posthog.init(PUBLIC_POSTHOG_KEY, {
      api_host: `${rootUrl}/ingest`,
      ui_host: 'https://us.posthog.com',
      capture_pageview: false,
      capture_pageleave: false,
    })
  }
  const seo: DefaultSeo = {
    pageTitle: PUBLIC_DEFAULT_SEO_TITLE,
    pageDescription: PUBLIC_DEFAULT_SEO_DESCRIPTION,
    twitterCard: 'summary_large_image',
    twitterSite: rootUrl,
    twitterImage: `${rootUrl}/socialcard.jpg`,
    ogType: 'website',
    ogUrl: rootUrl,
    ogImage: `${rootUrl}/socialcard.jpg`,
  }
  return seo
}
