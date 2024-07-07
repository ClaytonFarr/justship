<script lang="ts">
  import { PUBLIC_PROJECT_NAME } from '$env/static/public'
  import { ChevronRight } from 'lucide-svelte'

  import Container from '$components/common/Container.svelte'
  import Tag from '$components/common/Tag.svelte'
  import Link from '$components/common/Link.svelte'
  import Pattern01 from '$components/common/Pattern01.svelte'

  export let reversed: boolean = false
  export let showLogo: boolean = true

  export let showNewsTags: boolean = true
  export let newsTagPrimaryText: string = 'Take Note of This'
  export let newsTagSecondaryText: string = 'See Something Important'
  export let newsTagHref: string = '#add'

  export let headingText: string = 'Accomplish the thing you desire'
  export let subheadingText: string =
    'Achieve your goals with ease and confidence using our suite of specific, high-value tools and features.'

  export let primaryLinkText: string = 'Try for Free'
  export let primaryLinkHref: string = '#add'
  export let showSecondaryLink: boolean = true
  export let secondaryLinkText: string = 'Learn More →'
  export let secondaryLinkHref: string = '#add'

  export let imageType: 'screenshot' | 'photo' = 'screenshot'
  export let imageUrl: string = imageType === 'screenshot' ? 'product-screenshot-hero.svg' : 'product-image-hero.jpg'
  export let imageAlt: string = imageType === 'screenshot' ? 'App Screenshot' : ''

  let containerClasses = `flex flex-col sm_flex-row ${imageType === 'screenshot' ? 'gap-x-16 lg_gap-x-0 pt-10 pb-24 sm_pb-32 lg_py-32' : 'gap-x-12 lg_gap-x-8 gap-y-12 pt-10 pb-12 md_py-24'}`
</script>

<template lang="pug">
  div(class!='{ reversed ? "dark" : "" }')
    .relative.isolate.overflow-hidden.bg-surface-lightest.dark_bg-surface-darkest
      Pattern01(
        strokeWidthClass='stroke-1',
        strokeColorClass='stroke-rule-light dark_opacity-20',
        additionalClasses='absolute inset-0 -z-10 h-full w-full [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]'
      )
      Container(additionalClasses='{ containerClasses }')
        .lg_mx-0.lg_max-w-xl.lg_flex-shrink-0.lg_pt-8
          +if('showLogo')
            img.h-11(src='logo.svg', alt='{ PUBLIC_PROJECT_NAME }').dark_invert
          .mt-12.sm_mt-16.lg_mt-16
            +if('showNewsTags')
              a.inline-flex.flex-wrap.gap-x-5.gap-y-4(href='{ newsTagHref }').group
                Tag(label='{ newsTagPrimaryText }', style='filled')
                Tag(label='{ newsTagSecondaryText }', iconRight='{ ChevronRight }')
          .max-w-xl
            h1.mt-9.sm_mt-10.text-5xl.font-display.font-medium.tracking-tight.text-content-heading.md_text-6xl.dark_text-content-heading-reversed(class='leading-[1.1] sm_leading-[1.1]') {headingText}
            p.mt-7.sm_mt-8.text-lg.leading-relaxed.text-content-secondary.dark_text-content-secondary-reversed.max-w-lg {subheadingText}
          .mt-8.sm_mt-10.flex.flex-wrap.items-baseline.gap-4
            Link(href='{ primaryLinkHref }', label='{ primaryLinkText }', filledButton, large)
            +if('showSecondaryLink')
              Link(href='{ secondaryLinkHref }', label='{ secondaryLinkText }', button)
        +if("imageType === 'screenshot'")
          .mt-16.flex.sm_mt-24.lg_ml-10.lg_mr-0.lg_mt-0.lg_max-w-none.lg_flex-none.xl_ml-32
            .max-w-3xl.flex-none.sm_max-w-5xl.lg_max-w-none
              .-m-2.rounded-xl.p-2.ring-1.ring-inset.lg_-m-4.lg_rounded-2xl.lg_p-4(
                class='bg-surface-dark/5 ring-surface-dark/10 dark_bg-surface-light/5 dark_ring-surface-light/15'
              )
                .bg-surface-lightest.dark_bg-surface-darkest.rounded-md.overflow-hidden.shadow-2xl.ring-1
                  img(
                    src='{ imageUrl }',
                    alt='{ imageAlt }',
                    width='2432',
                    height='1442',
                    class='w-[76rem] ring-content-heading/10'
                  )
          +elseif("imageType === 'photo'")
            .bg-red-100.rounded-2xl.overflow-hidden.aspect-square.sm_aspect-auto
              img.object-cover(
                src='{ imageUrl }',
                alt='{ imageAlt }',
              ).h-full.w-full
</template>
