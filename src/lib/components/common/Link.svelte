<script lang="ts">
  export let href: string
  export let label: string
  export let large: boolean = false
  export let filled: boolean = false
  export let button: boolean = filled ? true : false
  export let rounded: boolean = false
</script>

<template lang="pug">
  +if('button')
    // prettier-ignore
    a.font-medium.whitespace-nowrap(
      href='{ href }',
      class!='{ filled ? "bg-action hover_bg-action-hover text-surface-lightest shadow-sm focus_bg-action-active transition focus-visible_outline focus-visible_outline-2 focus-visible_outline-offset-2 focus-visible_outline-action" : "dark_text-content-secondary-reversed dark_hover_text-white text-content-body hover_text-action" } { large ? "text-base px-5 py-3.5" : "text-sm px-3.5 py-2.5" } { rounded ? "rounded-full px-7" : "rounded-md" }'
    ) {label}
    +else
      // prettier-ignore
      a.font-medium.leading-6.transition.dark_text-content-secondary-reversed.dark_hover_text-white.text-content-body.hover_text-action.whitespace-nowrap(
        href='{ href }'
        class!='{ large ? "text-base" : "text-sm" }',
      ) {label}</template>
