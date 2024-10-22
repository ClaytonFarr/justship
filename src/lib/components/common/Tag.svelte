<script lang="ts">
  import { ArrowRight, ArrowDown } from 'lucide-svelte'

  interface Props {
    label: string;
    style?: 'ghost' | 'filled' | 'bordered';
    iconLeft: any;
    iconRight: any;
    arrowDirection?: 'right' | 'down';
    href: string;
    hrefCtaLabel?: string;
    additionalClasses?: string;
  }

  let {
    label,
    style = 'ghost',
    iconLeft,
    iconRight,
    arrowDirection = 'right',
    href,
    hrefCtaLabel = 'Read more',
    additionalClasses = ''
  }: Props = $props();

  let commonClasses =
    'inline-flex items-center text-sm leading-6 opacity-90 hover_opacity-100 group-hover_opacity-100 whitespace-nowrap'
  let styleClasses = {
    ghost: 'text-content-secondary/85 dark_text-content-secondary-reversed/70',
    filled:
      'font-medium rounded-full px-4 py-1 text-action ring-1 ring-inset bg-action/10 ring-action/15 dark_bg-action/20 dark_ring-action/40',
    bordered:
      'rounded-full px-5 py-1 ring-1 ring-rule/40 bg-white/15 dark_bg-white/10 text-content-secondary/85 dark_text-content-secondary-reversed/70',
  }
  let tagClasses = $derived(`${commonClasses} ${styleClasses[style]} ${additionalClasses}`)
</script>

<!-- svelte-ignore a11y_missing_content -->
<template lang="pug">
  +if('href')
    // prettier-ignore
    a(href='{ href }', class='{ tagClasses }').group.space-x-4
      +if('iconLeft')
        +const('Icon = iconLeft')
        <Icon class='w-4 h-4' />
      span {label}
      +if('iconRight')
        +const('Icon = iconRight')
        <Icon class='w-4 h-4' />
      span.flex.items-center.space-x-1.transition.text-action.group-hover_text-action-hover
        span {hrefCtaLabel}
        +if("arrowDirection === 'down'")
          ArrowDown(size=12 strokeWidth=3)
          +else
            ArrowRight(size=12 strokeWidth=3)
    +else
      // prettier-ignore
      span(class='{ tagClasses }').space-x-2
        +if('iconLeft')
          +const('Icon = iconLeft')
          <Icon class='w-4 h-4' />
        span {label}
        +if('iconRight')
          +const('Icon = iconRight')
          <Icon class='w-4 h-4' />
</template>
