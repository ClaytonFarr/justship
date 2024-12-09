<script lang="ts">
  import Link from '$components/ui/custom/Link.svelte'
  import { Plane } from 'lucide-svelte'
  import type { PricingContent, PricingPlan } from '$lib/types'
  
  interface Props {
    id?: string;
    reversed?: boolean;
    // Default values - can overridden by data passed in at route page (e.g. `marketingContent.ts`)
    annualPriceDiscount?: any;
    content?: PricingContent;
  }

  let {
    id = 'pricing',
    reversed = false,
    annualPriceDiscount = (1 / 12) * 10,
    content = {
    headingTagline: 'Pricing',
    heading: 'Pricing plans for teams of all sizes',
    subheading:
      'Choose a plan that fits your needs – from our free starter option to our plans with comprehensive professional features.',
    cta: {
      include: true,
      requirePurchaseUrl: false,
    },
    plans: [
      {
        id: 'starter',
        name: 'Starter',
        description: 'Get started with essential features at no cost.',
        monthlyPrice: 0,
        annualPrice: Math.floor(0 * 12 * annualPriceDiscount),
        features: ['3 products', 'Up to 500 subscribers', 'Basic analytics', 'Email support'],
      },
      {
        id: 'pro',
        name: 'Pro',
        description: 'Advanced features for growing businesses and teams.',
        monthlyPrice: 49,
        annualPrice: Math.floor(49 * 12 * annualPriceDiscount),
        features: [
          '25 products',
          'Up to 10,000 subscribers',
          'Advanced analytics',
          '24-hour support time',
          'Marketing automations',
        ],
        isPopular: true,
      },
      {
        id: 'elite',
        name: 'Elite',
        description: 'Comprehensive features and support for large operations.',
        monthlyPrice: 99,
        annualPrice: Math.floor(99 * 12 * annualPriceDiscount),
        features: [
          'Unlimited products',
          'Unlimited subscribers',
          'Advanced analytics',
          '4-hour response time',
          'Marketing automations',
          'Custom reporting tools',
        ],
      },
    ],
  }
  }: Props = $props();

  let frequency = $state<'monthly' | 'annually'>('monthly');
  let price = $derived((plan: PricingPlan) => frequency === 'monthly' ? plan.monthlyPrice : plan.annualPrice);
  let period = $derived(frequency === 'monthly' ? 'month' : 'year');
</script>

<template lang="pug">
  // prettier-ignore
  div(class!='{ reversed ? "dark" : "" }' id='{id}')
    .bg-background.py-24.sm_py-32
      .container
        .mx-auto.max-w-4xl.lg_text-center
          h2.font-display.text-base.font-medium.leading-7.text-action { content.headingTagline }
          p.mt-2.font-display.text-4xl.font-medium.tracking-tight.text-foreground.sm_text-4xl { content.heading }
        p.lg_mx-auto.mt-6.max-w-2xl.lg_text-center.text-lg.leading-relaxed.text-muted-foreground { content.subheading }

        .mt-16.flex.lg_justify-center
          fieldset(aria-label='Payment frequency')
            .grid.grid-cols-2.gap-x-1.rounded-full.p-1.text-center.text-xs.font-medium.leading-5.ring-1.ring-inset.ring-border(class='dark_ring-white/30')
              label.cursor-pointer.rounded-full.px-3.py-1(
                class!='{ frequency === "monthly" ? "bg-action text-white" : "text-muted-foreground" }'
              )
                input.sr-only(type='radio', name='frequency', value='monthly', bind:group='{ frequency }')
                span Monthly
              label.cursor-pointer.rounded-full.px-3.py-1(
                class!='{ frequency === "annually" ? "bg-action text-white" : "text-muted-foreground" }'
              )
                input.sr-only(type='radio', name='frequency', value='annually', bind:group='{ frequency }')
                span Annually

        .isolate.lg_mx-auto.mt-10.flex.flex-wrap.lg_justify-center.gap-8.md_gap-5.lg_gap-8.md_mx-0.md_max-w-none
          +each('content.plans as plan')
            // prettier-ignore
            .rounded-3xl.p-8.xl_p-10(class='flex-1 min-w-64' class!="{ plan.isPopular ? 'ring-2 ring-action' : 'ring-1 ring-border dark_ring-white/30' }")
              // prettier-ignore
              .flex.items-center.justify-between
                h3.text-lg.font-medium.leading-8(id='plan-{plan.id}', class!="{ plan.isPopular ? 'text-action dark_text-action-hover' : 'text-foreground' }") {plan.name}
                +if('plan.isPopular')
                  p.rounded-full.py-1.text-xs.leading-5.text-action.px-3.whitespace-nowrap(class='bg-action/10 dark_text-action-hover dark_bg-none dark_ring-1 dark_ring-action-hover/60')
                    span.md_hidden.lg_inline Most popular
                    span.hidden.md_inline.lg_hidden Favorite

              p.mt-4.text-sm.leading-6.text-foreground {plan.description}
              p.mt-6.flex.items-baseline.gap-x-1
                span.text-4xl.font-bold.tracking-tight.text-foreground ${price(plan)}
                span.text-sm.font-medium.leading-6.text-foreground #[span.opacity-60 /]&thinsp;{period}

              // prettier-ignore
              +if('content.cta.include && content.cta.requirePurchaseUrl')
                Link(
                  label!='{ plan.monthlyPrice === 0 ? "Try for Free" : "Sign Up" }', 
                  button, large, fullWidth, shadow,
                  href='/signin?new&plan={plan.id}', 
                  filled='{plan.isPopular}', 
                  outlined='{!plan.isPopular}'
                  additionalClasses='mt-6')

              ul.mt-8.space-y-3.text-sm.leading-normal.text-foreground(role='list')
                +each('plan.features as feature')
                  li.flex.gap-x-4
                    svg.h-6.w-5.flex-none.text-action(viewBox='0 0 20 20', fill='currentColor', aria-hidden='true')
                      path(
                        fill-rule='evenodd',
                        d='M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z',
                        clip-rule='evenodd'
                      )
                    | {feature}
                    

        +if('content.cta.include && !content.cta.requirePurchaseUrl')
          .mt-9.lg_text-center.md_px-12
            Link(
              label='Get Started Today  –  Free', 
              button, large, shadow,
              href='/signin?new', 
              filled, rounded, fullWidth,
              additionalClasses='lg_max-w-lg py-4 text-lg')</template>
