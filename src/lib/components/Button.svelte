<script lang="ts">
  export let id: string
  export let label: string
  export let type: string = 'button'
  export let large: boolean = false
  export let onClick: (() => void) | undefined = undefined
</script>

<template lang="pug">
  // prettier-ignore
  button.flex.items-center.justify-center.bg-action.focus-visible_outline-action.hover_bg-action-hover.flex.w-full.justify-center.rounded-md.px-3.font-medium.leading-6.text-white.shadow-sm.focus-visible_outline.focus-visible_outline-2.focus-visible_outline-offset-2.transition(
    id='{ id }',
    type='{ type }',
    class!='{ large ? "h-input-lg text-base" : "h-input text-sm" }',
    on:click='{ onClick }'
  ) { label }</template>
