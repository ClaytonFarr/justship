import posthog from 'posthog-js'
import { browser, dev } from '$app/environment'
import { PUBLIC_ORIGIN, PUBLIC_POSTHOG_KEY } from '$env/static/public';

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
}
