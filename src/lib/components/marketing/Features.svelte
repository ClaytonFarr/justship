<script lang="ts">
  import { onMount } from 'svelte'
  import * as lucide from 'lucide-svelte'
  import type { Features } from '$lib/types'
  import Container from '$components/common/Container.svelte'

  export let id: string = 'features'
  export let reversed = false
  export let content: Features = {
    headingTagline: 'Accomplish what you need',
    heading: 'Everything you need to do exactly what you need.',
    subheading:
      'Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum pulvinar et feugiat blandit at. In mi viverra elit nunc.',
    features: [
      {
        heading: 'Feature Heading',
        summary:
          'Pellentesque enim a commodo malesuada turpis eleifend risus. Facilisis donec placerat sapien consequat tempor fermentum nibh.',
        lucideIcon: 'CloudUpload',
        url: '',
      },
      {
        heading: 'Feature Heading',
        summary:
          'Pellentesque enim a commodo malesuada turpis eleifend risus. Facilisis donec placerat sapien consequat tempor fermentum nibh.',
        lucideIcon: 'LockKeyhole',
        url: '',
      },
      {
        heading: 'Feature Heading',
        summary:
          'Pellentesque enim a commodo malesuada turpis eleifend risus. Facilisis donec placerat sapien consequat tempor fermentum nibh.',
        lucideIcon: 'RefreshCw',
        url: '',
      },
      {
        heading: 'Feature Heading',
        summary:
          'Pellentesque enim a commodo malesuada turpis eleifend risus. Facilisis donec placerat sapien consequat tempor fermentum nibh.',
        lucideIcon: 'Award',
        url: '',
      },
      {
        heading: 'Feature Heading',
        summary:
          'Pellentesque enim a commodo malesuada turpis eleifend risus. Facilisis donec placerat sapien consequat tempor fermentum nibh.',
        lucideIcon: 'BookText',
        url: '',
      },
      {
        heading: 'Feature Heading',
        summary:
          'Pellentesque enim a commodo malesuada turpis eleifend risus. Facilisis donec placerat sapien consequat tempor fermentum nibh.',
        lucideIcon: 'Cable',
        url: '',
      },
    ],
  }
</script>

<template lang="pug">
  // prettier-ignore
  div(class!='{ reversed ? "dark" : "" }' id='{id}')
    .bg-surface-lightest.dark_bg-surface-darkest
      Container(additionalClasses='pt-20 pb-32 md_pt-32 md_pb-40')
        .lg_mx-auto.lg_max-w-2xl.lg_text-center
          h2.font-display.text-base.font-medium.leading-7.text-action.dark_text-action-hover {content.headingTagline}
          p.mt-4.font-display.font-medium.text-3xl.tracking-tight.text-content-heading.dark_text-content-heading-reversed.sm_text-4xl.sm_leading-tight.lg_mx-auto.max-w-md {content.heading}
          p.mt-6.text-lg.leading-8.text-content-secondary.max-w-xl.lg_max-w-none.lg_mx-auto.dark_text-content-secondary-reversed {content.subheading}

        .mt-16.lg_mt-24.lg_max-w-4xl.lg_mx-auto
          dl.grid.grid-cols-1.gap-x-14.gap-y-8.md_gap-y-16.md_grid-cols-2.max-w-lg.md_max-w-none
            +each('content.features as feature')
              .flex.flex-col
                dt.flex.items-center.gap-x-6
                  .flex.items-center.justify-center.h-10.w-10.rounded-lg.bg-gradient-to-br.from-action-hover.to-action.text-white(class='p-2.5')
                    svelte:component(this='{ lucide[feature.lucideIcon] }', strokeWidth='2')
                  h3.text-base.font-medium.leading-7.text-content-heading.dark_text-content-heading-reversed {feature.heading}
                dd.ml-16.mt-3.flex.flex-auto.flex-col.text-base.leading-relaxed.text-content-secondary.dark_text-content-secondary-reversed
                  p.flex-auto {feature.summary}
                  +if('feature.url')
                    p.mt-4
                      a.text-sm.font-medium.leading-6.text-action(href='{ feature.url }')
                        | Learn more
                        span(aria-hidden='true') &rarr;</template>
