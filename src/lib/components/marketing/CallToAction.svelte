<script lang="ts">
  import Link from '$components/common/custom/Link.svelte'
  import type { CtaContent } from '$lib/types'

  interface Props {
    reversed?: boolean;
    // Default content - can overridden by data passed in at route page (e.g. `marketingContent.ts`)
    content?: CtaContent;
  }

  let { reversed = false, content = {
    heading: 'Get Started Today',
    subheading:
      'Discover the power of our solution. Take the next step towards achieving your goals and optimizing your workflows.',
    ctaLabel: 'Get first month free',
  } }: Props = $props();
</script>

<template lang="pug">
  // prettier-ignore
  div(class!='{ reversed ? "dark" : "" }')
    .bg-surface-lightest.dark_bg-surface-darkest
      .container.flex.flex-col.gap-6.py-24.items-center
        h1.text-3xl.font-display.font-medium.text-content-heading.dark_text-content-heading-reversed {content.heading}
        p.pb-2.text-lg.leading-relaxed.max-w-xl.mx-auto.text-center.text-content-secondary.dark_text-content-secondary-reversed {content.subheading}
        Link(label='{content.ctaLabel}', href='/signin', filled, large, rounded)
</template>
