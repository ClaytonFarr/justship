<script lang="ts">
  import { onMount } from 'svelte'
  import * as lucide from 'lucide-svelte'

  export let features02 = {
    headingTagline: 'Deploy faster',
    heading: 'Everything you need to deploy your app.',
    subheading:
      'Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum pulvinar et feugiat blandit at. In mi viverra elit nunc.',
    features: [
      {
        heading: 'Push to Deploy',
        summary:
          'Commodo nec sagittis tortor mauris sed. Turpis tortor quis scelerisque diam id accumsan nullam tempus. Pulvinar etiam lacus volutpat eu. Phasellus praesent ligula sit faucibus.',
        url: '#add',
        lucideIcon: 'CloudUpload',
      },
      {
        heading: 'SSL Certificates',
        summary:
          'Pellentesque enim a commodo malesuada turpis eleifend risus. Facilisis donec placerat sapien consequat tempor fermentum nibh.',
        url: '#add',
        lucideIcon: 'LockKeyhole',
      },
      {
        heading: 'Simple Queues',
        summary:
          'Pellentesque sit elit congue ante nec amet. Dolor aenean curabitur viverra suspendisse iaculis eget. Nec mollis placerat ultricies euismod ut condimentum.',
        url: '#add',
        lucideIcon: 'RefreshCw',
      },
    ],
  }
</script>

<template lang="pug">
  .mx-auto.mt-32.max-w-7xl.px-6.sm_mt-56.lg_px-8
    .mx-auto.max-w-2xl.lg_text-center
      h2.font-display.text-base.font-medium.leading-7.text-action {features02.headingTagline}
      p.mt-3.font-display.text-3xl.tracking-tight.text-content-heading.sm_text-4xl.sm_leading-tight {features02.heading}
      p.mt-6.text-lg.leading-8.text-content-secondary {features02.subheading}

    .mx-auto.mt-16.max-w-2xl.sm_mt-20.lg_mt-24.lg_max-w-none
      dl.grid.max-w-xl.grid-cols-1.gap-x-8.gap-y-16.lg_max-w-none.lg_grid-cols-3
        +each('features02.features as feature')
          .flex.flex-col
            dt.flex.items-center.gap-x-3.text-base.font-medium.leading-7.text-content-heading
              svelte:component.relative.-top-px.mr-1.inline.h-5.text-action(this='{ lucide[feature.lucideIcon] }')
              span {feature.heading}
            dd.mt-5.flex.flex-auto.flex-col.text-sm.leading-7.text-content-secondary
              p.flex-auto {feature.summary}
              p.mt-4
                a.text-sm.font-medium.leading-6.text-action(href='{ feature.url }')
                  | Learn more
                  span(aria-hidden='true') &rarr;</template>
