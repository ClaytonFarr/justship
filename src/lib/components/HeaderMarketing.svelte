<script lang="ts">
  import { PUBLIC_PROJECT_NAME } from '$env/static/public'
  import Container from './Container.svelte'
  import { Menu, X } from 'lucide-svelte'
  import { page } from '$app/stores'
  import { enhance } from '$app/forms'
  import type { Link } from '$lib/types'

  const navigation: Link[] = [
    { name: 'Features', href: '#features' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Pricing', href: '#pricing' },
  ]

  let mobileMenuOpen: boolean = false
</script>

<template lang="pug">
  header.bg-white
    Container
      nav.flex.items-center.justify-between.gap-x-6.py-6.lg_py-8(aria-label='Global')
        .flex.lg_flex-1
          h1: a.flex.items-center.gap-5(href='/', class='-m-1.5 p-1.5')
            img.h-8.w-auto(src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600', alt='')
            span.text-lg.font-semibold.text-gray-900 {PUBLIC_PROJECT_NAME}
        .hidden.lg_flex.lg_gap-x-12
          +each('navigation as item')
            a.text-sm.font-medium.leading-6.text-gray-900(href='{ item.href }') {item.name}

        +if('$page.data.user')
          form.flex.flex-1.justify-end(method='post', action='/login?/signout', use:enhance)
            button.btn.lg_block.lg_text-sm.lg_font-medium.lg_leading-6.lg_text-gray-900(type='submit') Log Out
          +else
            .flex.flex-1.items-center.justify-end.gap-x-7
              a.hidden.whitespace-nowrap.lg_block.lg_text-sm.lg_font-medium.lg_leading-6.lg_text-gray-900(href='/login') Log In
              a.whitespace-nowrap.rounded-md.bg-indigo-600.px-3.py-2.text-sm.font-medium.text-white.shadow-sm.hover_bg-indigo-500.focus-visible_outline.focus-visible_outline-2.focus-visible_outline-offset-2.focus-visible_outline-indigo-600(
                href='/login'
              ) Sign Up
        .flex.lg_hidden
          button.inline-flex.items-center.justify-center.rounded-md.text-gray-700(type='button', class='-m-2.5 p-2.5', on:click!='{ () => mobileMenuOpen = true }')
            span.sr-only Open main menu
            svelte:component.h-6.w-6(this='{ Menu }', aria-hidden='true')

      +if('mobileMenuOpen')
        .lg_hidden(role='dialog', aria-modal='true')
          .fixed.inset-0.z-10
          .fixed.inset-y-0.right-0.z-10.w-full.overflow-y-auto.bg-white.px-6.py-6.sm_max-w-sm.sm_ring-1(class='sm_ring-gray-900/10')
            .flex.items-center.gap-x-6
              h1: a.flex.items-center.gap-5(href='/', class='-m-1.5 p-1.5')
                img.h-8.w-auto(src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600', alt='')
                span.text-lg.font-semibold.text-gray-900.sm_sr-only {PUBLIC_PROJECT_NAME}
              +if('!$page.data.user')
                a.ml-auto.whitespace-nowrap.rounded-md.bg-indigo-600.px-3.py-2.text-sm.font-semibold.text-white.shadow-sm.hover_bg-indigo-500.focus-visible_outline.focus-visible_outline-2.focus-visible_outline-offset-2.focus-visible_outline-indigo-600(
                  href='/login'
                ) Sign Up
              button.rounded-md.text-gray-700(type='button', class='-m-2.5 p-2.5', on:click!='{ () => mobileMenuOpen = false }')
                span.sr-only Close menu
                svelte:component.h-6.w-6(this='{ X }', aria-hidden='true')
            .mt-6.flow-root
              .-my-6.divide-y(class='divide-gray-500/10')
                .space-y-2.py-6
                  +each('navigation as item')
                    a.-mx-3.block.rounded-lg.px-3.py-2.text-base.font-semibold.leading-7.text-gray-900.hover_bg-gray-50(href='{ item.href }') {item.name}
                .py-6
                  +if('$page.data.user')
                    form(method='post', action='/login?/signout', use:enhance)
                      button.-mx-3.block.whitespace-nowrap.rounded-lg.px-3.text-base.font-semibold.leading-7.text-gray-900.hover_bg-gray-50(type='submit', class='py-2.5') Log Out
                    +else
                      a.-mx-3.block.whitespace-nowrap.rounded-lg.px-3.text-base.font-semibold.leading-7.text-gray-900.hover_bg-gray-50(href='/login', class='py-2.5') Log In</template>
