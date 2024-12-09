<script lang="ts">
  import { PUBLIC_SUPPORT_EMAIL } from '$env/static/public'
  import type { FaqContent } from '$lib/types'

  interface Props {
    id?: string;
    reversed?: boolean;
    // Default content - can overridden by data passed in at route page (e.g. `marketingContent.ts`)
    content?: FaqContent;
  }

  let { id = 'faqs', reversed = false, content = {
    items: [
      {
        question: 'What is the main feature of our product?',
        answer:
          'Our product offers a comprehensive solution for managing your tasks efficiently. It provides an intuitive interface and powerful tools to help you organize and prioritize your work effectively.',
      },
      {
        question: 'How does the pricing structure work?',
        answer:
          'We offer flexible pricing options to suit different needs. Our plans range from a basic free tier to premium subscriptions with advanced features. Detailed pricing information can be found on our pricing page.',
      },
      {
        question: 'Is there a mobile app available?',
        answer:
          'Yes, we have mobile apps available for both iOS and Android devices. These apps offer seamless synchronization with the web version, allowing you to access your data on the go.',
      },
      {
        question: 'What kind of customer support do you provide?',
        answer:
          'We offer comprehensive customer support through various channels. This includes email support, live chat during business hours, and an extensive knowledge base with tutorials and FAQs.',
      },
      {
        question: 'Can I integrate this with other tools I use?',
        answer:
          'Absolutely. Our product supports integration with a wide range of popular tools and services. We provide APIs and pre-built integrations to help you connect our platform with your existing workflow.',
      },
      {
        question: 'What security measures are in place to protect my data?',
        answer:
          'We take data security very seriously. Our platform uses industry-standard encryption protocols, regular security audits, and strict access controls to ensure your data remains safe and confidential at all times.',
      },
    ],
  } }: Props = $props();
</script>

<template lang="pug">
  // prettier-ignore
  div(class!='{ reversed ? "dark" : "" }' id='{id}')
    .bg-background
      .container.pt-16.pb-20.sm_pt-24.sm_pb-32
        .lg_text-center
          h2.text-2xl.font-display.leading-snug.tracking-tight.text-foreground Frequently asked questions
          p.lg_mx-auto.mt-6.max-w-2xl.text-base.leading-7.text-muted-foreground.max-w-prose
            | Have a different question and can't find the answer you're looking for? #[span.md_block #[a.text-action.dark_text-action-hover.hover_text-action-hover.underline(href='mailto:{PUBLIC_SUPPORT_EMAIL}') Please send us an email] and we'll get back to you&nbsp;quickly.]
        .mt-12.sm_mt-20
          dl.grid.sm_grid-cols-2.sm_gap-x-6.gap-y-8.sm_gap-y-12.sm_space-y-0.lg_grid-cols-3.lg_gap-x-14
            +each('content.items as faq')
              .space-y-4
                dt.text-lg.font-medium.leading-7.text-foreground {faq.question}
                dd.mt-2.text-base.leading-relaxed.text-muted-foreground {faq.answer}</template>
