<script lang="ts">
  import { PUBLIC_PROJECT_NAME } from '$env/static/public'
  import { ChevronRight } from 'lucide-svelte'

  import Container from '$components/common/Container.svelte'
  import Tag from '$components/common/Tag.svelte'
  import Link from '$components/common/Link.svelte'
  import Pattern01 from '$components/common/Pattern01.svelte'

  export let showLogo: boolean = true
  export let showTags: boolean = true

  export let newsPrimaryText: string = 'Take Note of This'
  export let newsSecondaryText: string = 'See Something Important'
  export let newsHref: string = '#add'

  export let headingText: string = 'Accomplish the thing you desire'
  export let subheadingText: string =
    'Achieve your goals with ease and confidence using our suite of specific, high-value tools and features.'

  export let primaryLinkText: string = 'Try for Free'
  export let primaryLinkHref: string = '#add'
  export let secondaryLinkText: string = 'Learn More →'
  export let secondaryLinkHref: string = '#add'

  export let featuredProductImageUrl: string = 'product-image-hero.svg'
</script>

<template lang="pug">
  .relative.isolate.overflow-hidden.bg-surface-lightest
    Pattern01(
      strokeWidthClass='stroke-2',
      strokeColorClass='stroke-rule-light',
      additionalClasses='absolute inset-0 -z-10 h-full w-full [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]'
    )
    Container(additionalClasses='pb-24 pt-10 sm_pb-32 lg_flex lg_py-40')
      .lg_mx-0.lg_max-w-xl.lg_flex-shrink-0.lg_pt-8
        +if('showLogo')
          img.h-11(src='logo.svg', alt='{ PUBLIC_PROJECT_NAME }')
        .mt-24.sm_mt-32.lg_mt-16
          +if('showTags')
            a.inline-flex.space-x-6(href='{ newsHref }')
              Tag(label='{ newsPrimaryText }', style='filled')
              Tag(label='{ newsSecondaryText }', iconRight='{ ChevronRight }')
        .max-w-xl
          h1.mt-10.text-4xl.font-display.font-medium.tracking-tight.text-content-heading.sm_text-6xl {headingText}
          p.mt-6.text-lg.leading-8.text-content-secondary {subheadingText}
        .mt-10.flex.items-baseline.gap-x-6
          Link(href='{ primaryLinkHref }', label='{ primaryLinkText }', filled, large)
          Link(href='{ secondaryLinkHref }', label='{ secondaryLinkText }')
      .mt-16.flex.sm_mt-24.lg_ml-10.lg_mr-0.lg_mt-0.lg_max-w-none.lg_flex-none.xl_ml-32
        .max-w-3xl.flex-none.sm_max-w-5xl.lg_max-w-none
          .-m-2.rounded-xl.p-2.ring-1.ring-inset.lg_-m-4.lg_rounded-2xl.lg_p-4(
            class='bg-content-heading/5 ring-content-heading/10'
          )
            img.rounded-md.shadow-2xl.ring-1(
              src='{ featuredProductImageUrl }',
              alt='App screenshot',
              width='2432',
              height='1442',
              class='w-[76rem] ring-content-heading/10'
            )
</template>
