<script lang="ts">
  import { PUBLIC_COMPANY_NAME, PUBLIC_PRODUCT_NAME, PUBLIC_ORIGIN, PUBLIC_SUPPORT_EMAIL } from '$env/static/public'
  import { dev } from '$app/environment'
  import type { PrivacyFeatures } from '$lib/types'

  const PUBLIC_COMPANY_NAME_SHORT = PUBLIC_COMPANY_NAME.replace(/,?\s*LLC$/, '') // strip LLC, if present
  const rootUrl = dev ? 'http://localhost:5173' : PUBLIC_ORIGIN
</script>

<template lang="pug">
  h1 Help
  .max-w-md
    p If you need help with anything - you can reach us at #[a(href='mailto:{PUBLIC_SUPPORT_EMAIL}') {PUBLIC_SUPPORT_EMAIL}].
    p We'd love to help with any questions you have.</template>
