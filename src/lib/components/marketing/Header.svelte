<script lang="ts">
  import { PUBLIC_PRODUCT_NAME } from '$env/static/public'
  import { Menu, X } from 'lucide-svelte'
  import Container from '../common/Container.svelte'
  import type { Link } from '$lib/types'


  
  interface Props {
    navAlignment?: 'left' | 'center' | 'right';
    // Default content - can overridden by data passed in at route page
    navItems?: Link[];
    cta?: any;
  }

  let { navAlignment = 'right', navItems = [
    { label: 'Product', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
  ], cta = {
    include: false,
    label: 'Get Started Today',
    href: '/signin?new',
  } }: Props = $props();

  let mobileMenuOpen: boolean = $state(false)
</script>

<template lang="pug">
  header.bg-white
    Container
      nav.flex.h-20.items-center.justify-between.gap-x-6.py-6.sm_gap-x-10.lg_py-8(aria-label='Global')
        // prettier-ignore
        .flex(class!='{ navAlignment === "center" ? "flex-1" : "flex-1 sm_flex-0" }')
          h1: a.flex.items-center.gap-4(href='/', class='-m-1.5 p-1.5')
            img.h-8.w-auto(src='/logo.svg', alt='')
            span.font-display.text-lg.text-xl.font-medium.tracking-tight.text-content-heading {PUBLIC_PRODUCT_NAME}
        // prettier-ignore
        +if('navItems.length > 0')
          .md_gap-x-10(class!='{navItems.length > 1 ? "hidden md_flex" : "flex"} { navAlignment === "left" ? "justify-start flex-1" : navAlignment === "center" ? "justify-center" : "justify-end flex-1" }')
            +each('navItems as item')
              a.text-sm.font-medium.leading-6.text-content-heading.hover_text-action.transition(href='{ item.href }') {item.label}
        +if('cta.include')
          // prettier-ignore
          .flex.items-center(class!='{ navAlignment === "center" ? "flex-1 justify-end" : "" }')
            a.whitespace-nowrap.rounded.bg-action.bg-gradient-to-br.from-action-hover.to-action.hover_bg-none.px-3.py-2.text-sm.font-medium.text-white.shadow-sm.hover_bg-action-hover.focus-visible_outline.focus-visible_outline-2.focus-visible_outline-offset-2.focus-visible_outline-action(
              href='{cta.href}'
            ) {cta.label}
        +if('navItems.length > 1')
          .flex.md_hidden
            button.inline-flex.items-center.justify-center.rounded-md.text-content-body(
              type='button',
              class='-m-2.5 p-2.5',
              onclick!='{ () => mobileMenuOpen = true }'
            )
              span.sr-only Open main menu
              Menu.h-6.w-6.opacity-50.transition.duration-150.hover_opacity-100(strokeWidth='1.5', aria-hidden='true')

      +if('mobileMenuOpen')
        .md_hidden(role='dialog', aria-modal='true')
          .fixed.inset-0.z-10
          .fixed.inset-y-0.right-0.z-10.w-full.overflow-y-auto.bg-white.px-6.py-6.sm_max-w-sm.sm_ring-1(
            class='sm_ring-input-dark/10'
          )
            .flex.items-center.justify-between.gap-x-6
              h1: a.flex.items-center.gap-5(href='/', class='-m-1.5 p-1.5')
                img.h-8.w-auto(src='logo.svg', alt='')
                span.font-display.text-xl.font-medium.text-content-heading.sm_sr-only {PUBLIC_PRODUCT_NAME}
              button.rounded-md.text-content-body(
                type='button',
                class='-m-2.5 p-2.5',
                onclick!='{ () => mobileMenuOpen = false }'
              )
                span.sr-only Close menu
                X.h-6.w-6.opacity-50.transition.duration-150.hover_opacity-100(strokeWidth='1.5', aria-hidden='true')
            .mt-6.flow-root
              +if('navItems.length > 0')
                .-my-6.divide-y(class='divide-rule/10')
                  .space-y-2.py-6
                    +each('navItems as item')
                      a.hover_bg-surface-light-50.-mx-3.block.rounded-lg.px-3.py-2.text-base.font-medium.leading-7.text-content-heading(
                        href='{ item.href }'
                      ) {item.label}
                +if('cta.include')
                  .py-8
                    a.whitespace-nowrap.rounded.bg-action.px-3.py-3.text-base.font-medium.text-white.shadow-sm.hover_bg-action-hover.focus-visible_outline.focus-visible_outline-2.focus-visible_outline-offset-2.focus-visible_outline-action(
                      href='{ cta.href }'
                    ) {cta.label}
                    
</template>
