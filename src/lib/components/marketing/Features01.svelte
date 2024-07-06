<script lang="ts">
  import { onMount } from 'svelte'
  import * as lucide from 'lucide-svelte'

  export let features01 = {
    heading1stLine: 'Boost your productivity.',
    heading2ndLine: 'Start using our app today.',
    subheading:
      'Ac euismod vel sit maecenas id pellentesque eu sed consectetur. Malesuada adipiscing sagittis vel nulla. Ac euismod vel sit maecenas.',
    image: {
      url: 'https://tailwindui.com/img/component-images/dark-project-app-screenshot.png',
      alt: 'Product screenshot',
      width: '2432',
      height: '1442',
    },
    features: [
      {
        heading: 'Push to deploy.',
        summary: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit aute id magna.',
        lucideIcon: 'CloudUpload',
      },
      {
        heading: 'SSL certificates.',
        summary: 'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
        lucideIcon: 'LockKeyhole',
      },
      {
        heading: 'Database backups.',
        summary: 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus.',
        lucideIcon: 'HardDrive',
      },
    ],
  }
</script>

<template lang="pug">
  .mx-auto.mt-32.max-w-7xl.sm_mt-56.sm_px-6.lg_px-8
    .relative.isolate.overflow-hidden.bg-slate-900.px-6.py-20.sm_rounded-3xl.sm_px-10.sm_py-24.lg_py-24.xl_px-24
      .mx-auto.grid.max-w-2xl.grid-cols-1.gap-x-8.gap-y-16.sm_gap-y-20.lg_mx-0.lg_max-w-none.lg_grid-cols-2.lg_items-center.lg_gap-y-0
        .lg-row-start-2.lg-max-w-md
          h2.font-display.text-3xl.leading-10.tracking-tight.text-white.sm_text-4xl
            span.pr-3 {features01.heading1stLine}
            span.inline-block {features01.heading2ndLine}
          p.mt-6.text-lg.leading-7.text-content-secondary-reversed {features01.subheading}

        img.ring-white-10.relative.-z-20.min-w-full.max-w-xl.rounded-xl.shadow-xl.ring-1.lg_row-span-4.lg_max-w-none(
          src='{ features01.image.url }',
          alt='{ features01.image.alt }',
          width='{ features01.image.width }',
          height='{ features01.image.height }',
          class='lg_w-[64rem]'
        )
        .max-w-xl.lg_row-start-3.lg_mt-10.lg_max-w-md.lg_border-t.lg_pt-10(class='lg_border-white/10')
          ul.max-w-xl.space-y-7.text-base.leading-7.text-content-secondary-reversed.lg_max-w-none
            +each('features01.features as feature')
              li.space-x-2
                svelte:component.relative.-top-px.mr-1.inline.h-5.text-action(this='{ lucide[feature.lucideIcon] }')
                span.font-medium.text-white {feature.heading}
                span {feature.summary}

      .top-1-2.-translate-y-1-2.pointer-events-none.absolute.left-12.-z-10.transform-gpu.blur-3xl.lg_top-auto.lg_translate-y-0.lg_transform-gpu(
        class='lg_bottom-[-12rem]',
        aria-hidden='true'
      )
        .bg-gradient-to-tr.opacity-25(
          class='aspect-[1155-678] w-[72.1875rem] from-[#ff80b5] to-[#9089fc]',
          style='clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
        )</template>
