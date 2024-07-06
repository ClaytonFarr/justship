<script lang="ts">
  import { ArrowRight } from 'lucide-svelte'
  import * as lucide from 'lucide-svelte'

  export let label: string
  export let style: 'ghost' | 'filled' | 'bordered' = 'ghost'
  export let reversed: boolean = false
  export let iconLeft
  export let iconRight
  export let href: string
  export let hrefCtaLabel: string = 'Read more'
  export let additionalClasses: string = ''

  let commonClasses = 'inline-flex items-center space-x-2 text-sm leading-6'
  let styleClasses = {
    ghost: reversed ? 'text-content-secondary-reversed' : 'text-content-secondary',
    filled: 'font-medium rounded-full px-4 py-1 text-action ring-1 ring-inset bg-action/10 ring-action/10',
    bordered: `rounded-full px-5 py-1 ring-1 ring-rule bg-white/10 ${
      reversed ? 'text-content-body-reversed/75' : 'text-content-body/75'
    }`,
  }
  $: tagClasses = `${commonClasses} ${styleClasses[style]} ${additionalClasses}`
</script>

<!-- svelte-ignore a11y_missing_content -->
<template lang="pug">
  +if('href')
    // prettier-ignore
    a(href='{ href }', class='{ tagClasses }').group
      +if('iconLeft')
        svelte:component.h-5.w-5(this='{ lucide[iconLeft] }')
      span {label}
      +if('iconRight')
        svelte:component.h-5.w-5(this='{ lucide[iconRight] }')
      span(class!='{reversed ? "text-white/90 group-hover_text-white": "text-action group-hover_text-action-hover"}').flex.items-center.space-x-1.transition
        span {hrefCtaLabel}
        ArrowRight(size=12 strokeWidth=3)
    +else
      // prettier-ignore
      span(class='{ tagClasses }')
        +if('iconLeft')
          svelte:component.h-5.w-5(this='{ lucide[iconLeft] }')
        span {label}
        +if('iconRight')
          svelte:component.h-5.w-5(this='{ lucide[iconRight] }')</template>
