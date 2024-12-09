<script lang="ts">
  import { PUBLIC_PRODUCT_NAME } from '$env/static/public'
  import { ChevronRight, ChevronDown } from 'lucide-svelte'
  import type { HeroContent } from '$lib/types'

  import Tag from '$components/ui/custom/Tag.svelte'
  import Link from '$components/ui/custom/Link.svelte'
  import Pattern01 from '$components/images/Pattern01.svelte'
  
  interface Props {
    id?: string;
    reversed?: boolean;
    showLogo?: boolean;
    // Default content - can overridden by data passed in at route page (e.g. `marketingContent.ts`)
    content?: HeroContent;
  }

  let {
    id = 'hero',
    reversed = false,
    showLogo = true,
    content = {
      heading: 'Accomplish the thing you desire',
      subheading:
        'Achieve your goals with ease and confidence using our suite of specific, high-value tools and features.',
      newsTag: {
        primaryText: 'Take Note of This',
        secondaryText: 'See Something Important',
        href: '#faqs',
      },
      links: {
        primary: {
          text: 'Get Started Today',
          href: '/signin?new',
        },
        secondary: {
          text: 'Learn More  ↓',
          href: '#features',
        },
      },
      image: {
        type: 'screenshot',
        url: 'product-screenshot-hero.svg',
        alt: 'App Screenshot',
      },
    }
  }: Props = $props();

  let containerClasses = `flex flex-col sm_flex-row ${content.image.type === 'screenshot' ? 'gap-x-16 lg_gap-x-0 pt-10 pb-24 sm_pb-32 lg_py-32' : 'gap-x-12 lg_gap-x-8 gap-y-12 pt-10 pb-12 md_py-24'}`
</script>

<template lang="pug">
  div(class!='{ reversed ? "dark" : "" }' id='{id}')
    .relative.isolate.overflow-hidden.bg-surface-lightest.dark_bg-surface-darkest
      Pattern01(
        strokeWidthClass='stroke-1',
        strokeColorClass='stroke-rule-light dark_opacity-20',
        additionalClasses='absolute inset-0 -z-10 h-full w-full [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]'
      )
      .container(class!='{ containerClasses }')
        .lg_mx-0.lg_max-w-xl.lg_flex-shrink-0.lg_pt-8
          +if('showLogo')
            img.h-11(src='/logo.svg', alt='{ PUBLIC_PRODUCT_NAME }').dark_invert
          .mt-12.sm_mt-16
            +if('content.newsTag')
              p apple
              a.inline-flex.flex-wrap.gap-x-5.gap-y-4(href='{ content.newsTag.href }').group
                Tag(label='{ content.newsTag.primaryText }', style='filled')
                Tag(
                  label='{ content.newsTag.secondaryText }',
                  iconRight!='{ content.newsTag.href.includes("#") ? ChevronDown : ChevronRight }'
                )
          .max-w-xl
            h1.mt-9.sm_mt-10.text-5xl.font-display.font-medium.tracking-tight.text-content-heading.md_text-6xl.dark_text-content-heading-reversed(class='leading-[1.1] sm_leading-[1.1]') {content.heading}
            p.mt-7.sm_mt-8.text-lg.leading-relaxed.text-content-secondary.dark_text-content-secondary-reversed.max-w-lg {content.subheading}
          .mt-8.sm_mt-12.flex.flex-wrap.items-baseline.gap-4
            Link(href='{ content.links.primary.href }', label='{ content.links.primary.text }', filled, large)
            +if('content.links.secondary.text && content.links.secondary.text')
              Link(href='{ content.links.secondary.href }', label='{ content.links.secondary.text }', button)
        +if("content.image.type === 'screenshot'")
          .mt-16.flex.sm_mt-24.lg_ml-10.lg_mr-0.lg_mt-0.lg_max-w-none.lg_flex-none.xl_ml-32
            .max-w-3xl.flex-none.sm_max-w-5xl.lg_max-w-none
              .-m-2.rounded-xl.p-2.ring-1.ring-inset.lg_-m-4.lg_rounded-2xl.lg_p-4(
                class='bg-surface-dark/5 ring-surface-dark/10 dark_bg-surface-light/5 dark_ring-surface-light/15'
              )
                .bg-surface-lightest.dark_bg-surface-darkest.rounded-md.overflow-hidden.shadow-2xl.ring-1
                  img(
                    src='{ content.image.url }',
                    alt='{ content.image.alt }',
                    width='2432',
                    height='1442',
                    class='w-[76rem] ring-content-heading/10'
                  )
          +elseif("content.image.type === 'photo'")
            .bg-red-100.rounded-2xl.overflow-hidden.aspect-square.sm_aspect-auto
              img.object-cover(
                src='{ content.image.url }',
                alt='{ content.image.alt }',
              ).h-full.w-full
</template>
