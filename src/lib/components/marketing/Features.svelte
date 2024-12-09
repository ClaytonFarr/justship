<script lang="ts">
  import { onMount } from 'svelte'
  import * as lucide from 'lucide-svelte'
  import type { Features } from '$lib/types'

  interface Props {
    id?: string;
    reversed?: boolean;
    content?: Features;
  }

  let { id = 'features', reversed = false, content = {
    headingTagline: 'Accomplish what you need',
    heading: 'Everything you need to do exactly what you need.',
    subheading:
      'Discover a suite of powerful tools designed to streamline your workflow and boost productivity…',
    features: [
      {
        heading: 'Feature Heading',
        summary:
          'This is a brief description of the feature. It highlights the key benefits and functionality that users can expect from this particular aspect of the product.',
        lucideIcon: 'CloudUpload',
        url: '',
      },
      {
        heading: 'Feature Heading',
        summary:
          'Here we explain another important feature. This text provides a concise overview of how this feature adds value and improves the user experience.',
        lucideIcon: 'LockKeyhole',
        url: '',
      },
      {
        heading: 'Feature Heading',
        summary:
          'The third feature is described in this section. We outline the main advantages and how it addresses specific user needs or pain points.',
        lucideIcon: 'RefreshCw',
        url: '',
      },
      {
        heading: 'Feature Heading',
        summary:
          'Feature number four is detailed here. This text explains the functionality and benefits, helping users understand how it can be useful for them.',
        lucideIcon: 'Award',
        url: '',
      },
      {
        heading: 'Feature Heading',
        summary:
          'The fifth feature description goes here. It provides a clear and concise explanation of what the feature does and why it matters to the user.',
        lucideIcon: 'BookText',
        url: '',
      },
      {
        heading: 'Feature Heading',
        summary:
          'Our final feature is described in this block. We highlight its key aspects and how it contributes to the overall value proposition of the product.',
        lucideIcon: 'Cable',
        url: '',
      },
    ],
  } }: Props = $props();
</script>

<template lang="pug">
  // prettier-ignore
  div(class!='{ reversed ? "dark" : "" }' id='{id}')
    .bg-background
      .container.pt-20.pb-32.md_pt-32.md_pb-40
        .lg_mx-auto.lg_max-w-2xl.lg_text-center
          h2.font-display.text-base.font-medium.leading-7.text-action {content.headingTagline}
          p.mt-4.font-display.font-medium.text-3xl.tracking-tight.text-foreground.sm_text-4xl.sm_leading-tight.lg_mx-auto.max-w-md {content.heading}
          p.mt-6.text-lg.leading-8.text-muted-foreground.max-w-xl.lg_max-w-none.lg_mx-auto {content.subheading}

        .mt-16.lg_mt-24.lg_max-w-4xl.lg_mx-auto
          dl.grid.grid-cols-1.gap-x-14.gap-y-8.md_gap-y-16.md_grid-cols-2.max-w-lg.md_max-w-none
            +each('content.features as feature')
              .flex.flex-col
                dt.flex.items-center.gap-x-6
                  .flex.items-center.justify-center.h-10.w-10.rounded-lg.bg-gradient-to-br.from-action-hover.to-action.text-white(class='p-2.5')
                    +if('lucide[feature.lucideIcon]')
                      +const('Icon = lucide[feature.lucideIcon]')
                      <Icon strokeWidth={2} />
                  h3.text-base.font-medium.leading-7.text-foreground {feature.heading}
                dd.ml-16.mt-3.flex.flex-auto.flex-col.text-base.leading-relaxed.text-muted-foreground
                  p.flex-auto {feature.summary}
                  +if('feature.url')
                    p.mt-4
                      a.text-sm.font-medium.leading-6.text-action(href='{ feature.url }')
                        | Learn more
                        span(aria-hidden='true') &rarr;
</template>
