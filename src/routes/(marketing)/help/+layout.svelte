<script lang="ts">
  import Header from '$components/marketing/Header.svelte'
  import type { Link } from '$lib/types'

  let { children } = $props()

  const headerNavItems: Link[] = [{ label: '←  Return Home', href: '/' }]
</script>

<template lang="pug">
  .mb_pb-24.space-y-2.pb-16.sm_space-y-6.md_space-y-8
    Header(navItems='{ headerNavItems }')
    .container.prose.prose-slate.prose-sm.prose-headings_font-medium.prose-h1_text-2xl.prose-h1_font-display.prose-h2_text-lg.prose-h2_font-display.prose-h3_font-display.prose-h3_text-base
      | {@render children()}
</template>
