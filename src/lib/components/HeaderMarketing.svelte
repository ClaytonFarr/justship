<script lang="ts">
  import { PUBLIC_PROJECT_NAME } from '$env/static/public'
  import Container from './Container.svelte'
  import DropdownMenu from './DropdownMenu.svelte'
  import { Menu, X, LogOut } from 'lucide-svelte'
  import { page } from '$app/stores'
  import { enhance } from '$app/forms'
  import type { Link } from '$lib/types'

  const navigation: Link[] = [
    { label: 'Features', href: '#features' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Pricing', href: '#pricing' },
  ]

  const accountNavigation: Link[] = [{ label: 'Settings', href: '/app/settings' }]

  let mobileMenuOpen: boolean = false
</script>

<template lang="pug">
  header.bg-white
    Container
      nav.flex.h-20.items-center.justify-between.gap-x-6.py-6.lg_py-8(aria-label='Global')
        .flex.md_flex-1
          h1: a.flex.items-center.gap-4(href='/', class='-m-1.5 p-1.5')
            img.h-8.w-auto(src='logo.svg', alt='')
            span.text-content-heading.text-lg.font-semibold.tracking-tight {PUBLIC_PROJECT_NAME}
        .hidden.md_flex.md_gap-x-12
          +each('navigation as item')
            a.text-content-heading.text-sm.font-medium.leading-6(href='{ item.href }') {item.label}
        .flex.flex-1.items-center.justify-end
          a.whitespace-nowrap.rounded-md.bg-action.px-3.py-2.text-sm.font-medium.text-white.shadow-sm.hover_bg-action-hover.focus-visible_outline.focus-visible_outline-2.focus-visible_outline-offset-2.focus-visible_outline-action(
            href!='{ $page.data.user ? "/app" : "/signin" }'
          ) Launch #[span.sr-only.sm_not-sr-only App]
        .flex.md_hidden
          button.text-content-body.inline-flex.items-center.justify-center.rounded-md(type='button', class='-m-2.5 p-2.5', on:click!='{ () => mobileMenuOpen = true }')
            span.sr-only Open main menu
            Menu.h-6.w-6.opacity-50.transition.duration-150.hover_opacity-100(strokeWidth='1.5', aria-hidden='true')

      +if('mobileMenuOpen')
        .md_hidden(role='dialog', aria-modal='true')
          .fixed.inset-0.z-10
          .fixed.inset-y-0.right-0.z-10.w-full.overflow-y-auto.bg-white.px-6.py-6.sm_max-w-sm.sm_ring-1(class='sm_ring-input-dark/10')
            .flex.items-center.justify-between.gap-x-6
              h1: a.flex.items-center.gap-5(href='/', class='-m-1.5 p-1.5')
                img.h-8.w-auto(src='logo.svg', alt='')
                span.text-content-heading.text-lg.font-semibold.sm_sr-only {PUBLIC_PROJECT_NAME}
              button.text-content-body.rounded-md(type='button', class='-m-2.5 p-2.5', on:click!='{ () => mobileMenuOpen = false }')
                span.sr-only Close menu
                X.h-6.w-6.opacity-50.transition.duration-150.hover_opacity-100(strokeWidth='1.5', aria-hidden='true')
            .mt-6.flow-root
              .-my-6.divide-y(class='divide-rule/10')
                .space-y-2.py-6
                  +each('navigation as item')
                    a.text-content-heading.hover_bg-surface-light-50.-mx-3.block.rounded-lg.px-3.py-2.text-base.font-medium.leading-7(href='{ item.href }') {item.label}
                .py-8
                  a.whitespace-nowrap.rounded-md.bg-action.px-3.py-3.text-base.font-medium.text-white.shadow-sm.hover_bg-action-hover.focus-visible_outline.focus-visible_outline-2.focus-visible_outline-offset-2.focus-visible_outline-action(
                    href!='{ $page.data.user ? "/app" : "/signin" }'
                  ) Launch #[span.sr-only.sm_not-sr-only App]</template>
