<script lang="ts">
  export let href: string
  export let label: string
  export let large: boolean = false
  export let filled: boolean = false
  export let reversed: boolean = false
</script>

<template lang="pug">
  +if('filled')
    // prettier-ignore
    a.rounded-md.bg-action.font-medium.text-surface-lightest.shadow-sm.transition.hover_bg-action-hover.focus_bg-action-active.focus-visible_outline.focus-visible_outline-2.focus-visible_outline-offset-2.focus-visible_outline-action.large(
      href='{ href }',
      class!='{ large ? "text-base px-5 py-3.5" : "text-sm px-3.5 py-2.5" }'
    ) {label}
    +else
      // prettier-ignore
      a.font-medium.leading-6.transition(
        href='{ href }'
        class!='{ reversed ? "text-content-body-reversed hover_text-white" : "text-content-body hover_text-action" } { large ? "text-base" : "text-sm" }',
      ) {label}</template>
