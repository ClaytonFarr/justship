<script lang="ts">
  import { PUBLIC_SUPPORT_EMAIL } from '$env/static/public'
  import type { FaqContent } from '$lib/types'
  import Container from '$components/common/Container.svelte'

  export let reversed = false
  export let content: FaqContent = {
    items: [
      {
        question: 'Question One',
        answer:
          'Curabitur blandit tempus porttitor. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Maecenas faucibus mollis interdum.',
      },
      {
        question: 'Question Two',
        answer:
          'Curabitur blandit tempus porttitor. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Maecenas faucibus mollis interdum.',
      },
      {
        question: 'Question Three',
        answer:
          'Curabitur blandit tempus porttitor. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Maecenas faucibus mollis interdum.',
      },
      {
        question: 'Question Four',
        answer:
          'Curabitur blandit tempus porttitor. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Maecenas faucibus mollis interdum.',
      },
      {
        question: 'Question Five',
        answer:
          'Curabitur blandit tempus porttitor. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Maecenas faucibus mollis interdum.',
      },
      {
        question: 'Question Six',
        answer:
          'Curabitur blandit tempus porttitor. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Maecenas faucibus mollis interdum.',
      },
    ],
  }
</script>

<template lang="pug">
  // prettier-ignore
  div(class!='{ reversed ? "dark" : "" }')
    .bg-surface-lightest.dark_bg-surface-darkest
      Container(additionalClasses='pt-16 pb-20 sm_pt-24 sm_pb-32')
        .lg_text-center
          h2.text-2xl.font-display.leading-snug.tracking-tight.text-content-heading.dark_text-content-heading-reversed Frequently asked questions
          p.lg_mx-auto.mt-6.max-w-2xl.text-base.leading-7.text-content-secondary.dark_text-content-secondary-reversed.max-w-prose
            | Have a different question and can't find the answer you're looking for? #[span.md_block #[a.text-action.dark_text-action-hover.hover_text-action-hover.underline(href='mailto:{PUBLIC_SUPPORT_EMAIL}') Please send us an email] and we'll get back to you&nbsp;quickly.]
        .mt-12.sm_mt-20
          dl.grid.sm_grid-cols-2.sm_gap-x-6.gap-y-8.sm_gap-y-12.sm_space-y-0.lg_grid-cols-3.lg_gap-x-14
            +each('content.items as faq')
              .space-y-4
                dt.text-lg.font-medium.leading-7.text-content-heading.dark_text-content-heading-reversed {faq.question}
                dd.mt-2.text-base.leading-relaxed.text-content-secondary.dark_text-content-secondary-reversed {faq.answer}</template>
