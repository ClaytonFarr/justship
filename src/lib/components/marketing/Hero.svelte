<script lang="ts">
  import { ChevronRight } from 'lucide-svelte'

  export let whatsNewText: string = "What's new"
  export let versionText: string = 'Just shipped v1.0'
  export let headingText: string = 'Deploy to the cloud with confidence'
  export let paragraphText: string =
    'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.'
  export let getStartedText: string = 'Get started'
  export let learnMoreText: string = 'Learn more'
</script>

<template lang="pug">
  .relative.isolate.overflow-hidden.bg-surface-lightest
    svg.absolute.inset-0.-z-10.h-full.w-full.stroke-rule-light(class='[mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]', aria-hidden='true')
      defs
        pattern#0787a7c5-978c-4f66-83c7-11c213f99cb7(width='200', height='200', x='50%', y='-1', patternUnits='userSpaceOnUse')
          path(d='M.5 200V.5H200', fill='none')
      rect(width='100%', height='100%', stroke-width='0', fill='url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)')
    .mx-auto.max-w-7xl.px-6.pb-24.pt-10.sm_pb-32.lg_flex.lg_px-8.lg_py-40
      .mx-auto.max-w-2xl.lg_mx-0.lg_max-w-xl.lg_flex-shrink-0.lg_pt-8
        img.h-11(src='logo.svg', alt='Your Company')
        .mt-24.sm_mt-32.lg_mt-16
          a.inline-flex.space-x-6(href='#fix')
            span.rounded-full.px-3.py-1.text-sm.font-semibold.leading-6.text-action.ring-1.ring-inset(class='bg-action/10 ring-action/10') {whatsNewText}
            span.inline-flex.items-center.space-x-2.text-sm.font-medium.leading-6.text-content-secondary
              span {versionText}
              ChevronRight.h-5.w-5.text-content-tertiary
        h1.mt-10.text-4xl.font-bold.tracking-tight.text-content-heading.sm_text-6xl {headingText}
        p.mt-6.text-lg.leading-8.text-content-body {paragraphText}
        .mt-10.flex.items-center.gap-x-6
          a.rounded-md.bg-action.text-sm.font-semibold.text-surface-lightest.shadow-sm.hover_bg-action-hover.focus-visible_outline.focus-visible_outline-2.focus-visible_outline-offset-2.focus-visible_outline-action(
            href='#fix',
            class='px-3.5.py-2.5'
          ) {getStartedText}
          a.text-sm.font-semibold.leading-6.text-content-heading(href='#fix') {learnMoreText}
            span(aria-hidden='true') →
      .mx-auto.mt-16.flex.max-w-2xl.sm_mt-24.lg_ml-10.lg_mr-0.lg_mt-0.lg_max-w-none.lg_flex-none.xl_ml-32
        .max-w-3xl.flex-none.sm_max-w-5xl.lg_max-w-none
          .-m-2.rounded-xl.p-2.ring-1.ring-inset.lg_-m-4.lg_rounded-2xl.lg_p-4(class='bg-content-heading/5 ring-content-heading/10')
            img.rounded-md.shadow-2xl.ring-1(
              src='https://tailwindui.com/img/component-images/project-app-screenshot.png',
              alt='App screenshot',
              width='2432',
              height='1442',
              class='w-[76rem] ring-content-heading/10'
            )</template>
