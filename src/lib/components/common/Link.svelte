<script lang="ts">
  export let href: string
  export let label: string
  export let filled: boolean = false
  export let reversed: boolean = false
</script>

<template lang="pug">
  +if('filled')
    a.rounded-md.bg-action.text-sm.font-medium.text-surface-lightest.shadow-sm.transition.hover_bg-action-hover.focus_bg-action-active.focus-visible_outline.focus-visible_outline-2.focus-visible_outline-offset-2.focus-visible_outline-action(
      href='{ href }',
      class='px-3.5 py-2.5'
    ) {label}
    +else
      // prettier-ignore
      a.text-sm.font-medium.leading-6.transition(
        href='{ href }'
        class!='{ reversed ? "text-content-body-reversed hover_text-white" : "text-content-body hover_text-action" }',
      ) {label}</template>
