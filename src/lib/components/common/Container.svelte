<script lang="ts">
  import type { Snippet } from 'svelte'
  let { additionalClasses, children }: { additionalClasses: string; children: Snippet } = $props()
</script>

<template lang="pug">
  // prettier-ignore
  .mx-auto.max-w-7xl.px-6.sm_px-8.md_px-16(class='{ additionalClasses }')
    | {@render children()}</template>
