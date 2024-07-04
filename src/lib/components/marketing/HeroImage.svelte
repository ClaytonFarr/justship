<script lang="ts">
  import { ChevronRight } from 'lucide-svelte'
  import Tag from '$components/common/Tag.svelte'
  import Link from '$components/common/Link.svelte'

  export let reversedText: boolean = true

  export let newsPrimaryText: string = 'Take note of something important.'
  export let newsSecondaryText: string = 'Read more'
  export let newsHref: string = '#add'

  export let headingText: string = 'Accomplish the thing you desire'
  export let subheadingText: string =
    'Achieve your goals with ease and confidence using our suite of specific, high-value tools and features.'

  export let primaryLinkText: string = 'Launch App'
  export let primaryLinkHref: string = '#add'
  export let secondaryLinkText: string = 'Learn More →'
  export let secondaryLinkHref: string = '#add'

  export let imageUrl: string =
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2830&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply'
</script>

<template lang="pug">
  .bg-surface-light.relative
    .relative.mx-auto.py-32.sm_py-48.lg_py-56.z-10
      .hidden.sm_mb-8.sm_flex.sm_justify-center
        Tag(label='{ newsPrimaryText }', style='bordered', href='{ newsHref }', hrefCtaLabel='{ newsSecondaryText }', reversed='{reversedText}')
      .text-center
        h1(class!='{reversedText ? "text-content-heading-reversed" : "text-content-heading"}').mx-auto.max-w-xl.text-4xl.font-bold.tracking-tight.sm_text-6xl {headingText}
        p(class!='{reversedText ? "text-content-body-reversed" : "text-content-body"}').mx-auto.mt-6.max-w-lg.text-lg.leading-8 {subheadingText}
        .mt-10.flex.items-center.justify-center.gap-x-6
          Link(href='{ primaryLinkHref }', label='{ primaryLinkText }', filled)
          Link(href='{ secondaryLinkHref }', label='{ secondaryLinkText }', reversed='{reversedText}')
    .absolute.inset-0
      img.h-full.w-full.object-cover(
        src='{imageUrl}',
        alt=''
      )
      //- .absolute.inset-x-0.-top-40.-z-10.transform-gpu.overflow-hidden.blur-3xl.sm_-top-80(aria-hidden='true')
        .relative.bg-gradient-to-tr.from-action.to-action-hover.opacity-20(
          class='sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg]',
          style='clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
        )
</template>
