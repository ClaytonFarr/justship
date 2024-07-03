<script lang="ts">
  export let id: string
  export let label: string
  export let processingLabel: string = 'Processing...'
  export let type: string = 'button'
  export let large: boolean = false
  export let onClick: (() => void) | undefined = undefined
  export let loading: boolean = false
  export let disabled: boolean = false
</script>

<template lang="pug">
  // prettier-ignore
  button.flex.items-center.justify-center.bg-action.focus-visible_outline-action.hover_bg-action-hover.flex.w-full.justify-center.rounded-md.px-3.font-medium.leading-6.text-white.shadow-sm.focus-visible_outline.focus-visible_outline-2.focus-visible_outline-offset-2.transition(
    id='{ id }',
    type='{ type }',
    class!='{ large ? "h-input-lg text-base" : "h-input text-sm" } { loading || disabled ? "opacity-75 cursor-not-allowed" : "" }',
    on:click='{ onClick }',
    disabled='{ disabled || loading }'
  )
    +if('loading')
      svg.animate-spin.-ml-1.mr-3.h-5.w-5.text-white(
        xmlns='http://www.w3.org/2000/svg',
        fill='none',
        viewBox='0 0 24 24'
      )
        circle.opacity-25(
          cx='12',
          cy='12',
          r='10',
          stroke='currentColor',
          stroke-width='4'
        )
        path.opacity-75(
          fill='currentColor',
          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        )
      span { processingLabel }
      +else
        span { label }</template>
