<script lang="ts">
  import Link from '$components/ui/custom/Link.svelte'
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
    .bg-background
      .container.flex.flex-col.gap-6.py-24.items-center
        h1.text-3xl.font-display.font-medium.text-foreground {content.heading}
        p.pb-2.text-lg.leading-relaxed.max-w-xl.mx-auto.text-center.text-muted-foreground {content.subheading}
        Link(label='{content.ctaLabel}', href='/signin', filled, large, rounded)
</template>
