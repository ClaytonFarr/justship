<script lang="ts">
  import { ChevronRight } from 'lucide-svelte'
  import Tag from '$components/common/Tag.svelte'
  import Link from '$components/common/Link.svelte'

  export let reversedText: boolean = false

  export let newsPrimaryText: string = 'Take note of something important.'
  export let newsSecondaryText: string = 'Read more'
  export let newsHref: string = '#add'

  export let headingText: string = 'Accomplish the thing you desire'
  export let subheadingText: string =
    'Achieve your goals with ease and confidence using our suite of specific, high-value tools and features.'

  export let primaryLinkText: string = 'Try for Free'
  export let primaryLinkHref: string = '#add'
  export let secondaryLinkText: string = 'Learn More →'
  export let secondaryLinkHref: string = '#add'

  export let imageUrl: string =
    'https://images.unsplash.com/photo-1556740772-1a741367b93e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aGFwcHklMjBjdXN0b21lcnxlbnwwfHwwfHx8MA%3D%3D&w=800&fit=crop&q=60&auto=format&sat=-50&exp=20&&blend=333333&blend-mode=multiply'

  const imageGradientClasses = reversedText
    ? 'bg-gradient-to-br from-slate-500 to-sky-950'
    : 'bg-gradient-to-br from-white to-sky-100'
</script>

<template lang="pug">
  .bg-surface-light.relative.overflow-hidden
    .relative.mx-auto.py-32.sm_py-48.lg_py-56.z-10
      .hidden.sm_mb-10.sm_flex.sm_justify-center
        Tag(label='{ newsPrimaryText }', style='bordered', href='{ newsHref }', hrefCtaLabel='{ newsSecondaryText }', reversed='{reversedText}')
      .text-center
        h1.mx-auto.max-w-xl.text-4xl.font-display.font-medium.tracking-tight.sm_text-7xl(class!='{reversedText ? "text-content-heading-reversed" : "text-content-heading"}') {headingText}
        p.mx-auto.mt-8.max-w-lg.text-lg.leading-8(class!='{reversedText ? "text-content-body-reversed" : "text-content-body"}') {subheadingText}
        .mt-10.flex.items-baseline.justify-center.gap-x-6
          Link(href='{ primaryLinkHref }', label='{ primaryLinkText }', filled, large)
          Link(href='{ secondaryLinkHref }', label='{ secondaryLinkText }', reversed='{reversedText}')
    .absolute.inset-0.z-0
      .absolute.z-10.inset-0.opacity-75(class='{imageGradientClasses}')
      img.h-full.w-full.object-cover(
        src='{imageUrl}',
        alt=''
        )
</template>
