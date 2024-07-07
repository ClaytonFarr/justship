<script lang="ts">
  import { ArrowRight } from 'lucide-svelte'

  export let label: string
  export let style: 'ghost' | 'filled' | 'bordered' = 'ghost'
  export let iconLeft
  export let iconRight
  export let href: string
  export let hrefCtaLabel: string = 'Read more'
  export let additionalClasses: string = ''

  let commonClasses =
    'inline-flex items-center text-sm leading-6 opacity-90 hover_opacity-100 group-hover_opacity-100 whitespace-nowrap'
  let styleClasses = {
    ghost: 'text-content-secondary/85 dark_text-content-secondary-reversed/70',
    filled:
      'font-medium rounded-full px-4 py-1 text-action ring-1 ring-inset bg-action/10 ring-action/15 dark_bg-action/20 dark_ring-action/40',
    bordered:
      'rounded-full px-5 py-1 ring-1 ring-rule/40 bg-white/15 dark_bg-white/10 text-content-secondary/85 dark_text-content-secondary-reversed/70',
  }
  $: tagClasses = `${commonClasses} ${styleClasses[style]} ${additionalClasses}`
</script>

<!-- svelte-ignore a11y_missing_content -->
<template lang="pug">
  +if('href')
    // prettier-ignore
    a(href='{ href }', class='{ tagClasses }').group.space-x-4
      +if('iconLeft')
        svelte:component.h-4.w-4(this='{ iconLeft }')
      span {label}
      +if('iconRight')
        svelte:component.h-4.w-4(this='{ iconRight }')
      span.flex.items-center.space-x-1.transition.text-action.group-hover_text-action-hover
        span {hrefCtaLabel}
        ArrowRight(size=12 strokeWidth=3)
    +else
      // prettier-ignore
      span(class='{ tagClasses }').space-x-2
        +if('iconLeft')
          svelte:component.h-4.w-4(this='{ iconLeft }')
        span {label}
        +if('iconRight')
          svelte:component.h-4.w-4(this='{ iconRight }')</template>
