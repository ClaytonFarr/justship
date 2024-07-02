<script lang="ts">
  import { PUBLIC_PROJECT_NAME } from '$env/static/public'
  import Container from './Container.svelte'
  import DropdownMenu from './DropdownMenu.svelte'
  import { Menu, X, LogOut } from 'lucide-svelte'
  import { page } from '$app/stores'
  import { enhance } from '$app/forms'
  import type { Link } from '$lib/types'

  const navigation: Link[] = [
    { label: 'Create', href: '/app/create' },
    { label: 'View', href: '/app/view' },
  ]

  const accountNavigation: Link[] = [{ label: 'Settings', href: '/app/settings', description: $page.data.user.email }]

  let mobileMenuOpen: boolean = false
</script>

<template lang="pug">
  header.bg-white
    Container
      nav.flex.h-20.items-center.justify-between.gap-x-8.py-6.lg_py-8(aria-label='Global')
        .flex
          h1: a.flex.items-center.gap-4(href='/app', class='-m-1.5 p-1.5')
            img.h-8.w-auto(src='logo.svg', alt='')
            span.sr-only {PUBLIC_PROJECT_NAME}
        .hidden.md_flex.md_gap-x-8
          +each('navigation as item')
            a.text-sm.font-medium.leading-6.text-gray-900(href='{ item.href }') {item.label}

        +if('$page.data.user')
          .flex.flex-1.justify-end
            DropdownMenu(menuLabel='Account', menuItems='{ accountNavigation }')
              form.group.flex.w-full.cursor-pointer.items-center.gap-x-3.rounded-md.px-6.py-3.pr-16.hover_bg-gray-50(
                method='post',
                action='/login?/signout',
                use:enhance
              )
                LogOut.h-4.w-4.opacity-50.transition.duration-200.group-hover_opacity-100
                button.text-left.text-sm.font-medium.leading-6.text-gray-900.group-hover_text-gray-900(type='submit') Log Out
          +else
            .flex.flex-1.items-center.justify-end.gap-x-7
              a.hidden.whitespace-nowrap.lg_block.lg_text-sm.lg_font-medium.lg_leading-6.lg_text-gray-900(href='/login') Log In
              a.whitespace-nowrap.rounded-md.bg-indigo-600.px-3.py-2.text-sm.font-medium.text-white.shadow-sm.hover_bg-indigo-500.focus-visible_outline.focus-visible_outline-2.focus-visible_outline-offset-2.focus-visible_outline-indigo-600(
                href='/login'
              ) Launch App
        .flex.md_hidden
          button.inline-flex.items-center.justify-center.rounded-md.text-gray-700(type='button', class='-m-2.5 p-2.5', on:click!='{ () => mobileMenuOpen = true }')
            span.sr-only Open main menu
            Menu.h-6.w-6.opacity-50.transition.duration-150.hover_opacity-100(strokeWidth='1.5', aria-hidden='true')

      +if('mobileMenuOpen')
        .md_hidden(role='dialog', aria-modal='true')
          .fixed.inset-0.z-10
          .fixed.inset-y-0.right-0.z-10.w-full.overflow-y-auto.bg-white.px-6.py-6.sm_max-w-sm.sm_ring-1(class='sm_ring-gray-900/10')
            .flex.items-center.justify-between.gap-x-6
              h1: a.flex.items-center.gap-5(href='/', class='-m-1.5 p-1.5')
                img.h-8.w-auto(src='logo.svg', alt='')
                span.text-lg.font-semibold.text-gray-900.sm_sr-only {PUBLIC_PROJECT_NAME}
              +if('!$page.data.user')
                a.ml-auto.whitespace-nowrap.rounded-md.bg-indigo-600.px-3.py-2.text-sm.font-medium.text-white.shadow-sm.hover_bg-indigo-500.focus-visible_outline.focus-visible_outline-2.focus-visible_outline-offset-2.focus-visible_outline-indigo-600(
                  href='/login'
                ) Sign Up
              button.rounded-md.text-gray-700(type='button', class='-m-2.5 p-2.5', on:click!='{ () => mobileMenuOpen = false }')
                span.sr-only Close menu
                X.h-6.w-6.opacity-50.transition.duration-150.hover_opacity-100(strokeWidth='1.5', aria-hidden='true')
            .mt-6.flow-root
              .-my-6.divide-y(class='divide-gray-500/10')
                .space-y-2.py-6
                  +each('navigation as item')
                    a.-mx-3.block.rounded-lg.px-3.py-2.text-base.font-medium.leading-7.text-gray-900.hover_bg-gray-50(href='{ item.href }') {item.label}
                .py-6
                  form.group.-mx-3.flex.cursor-pointer.items-center.gap-x-3.rounded-md.px-3.py-2.hover_bg-gray-50(
                    method='post',
                    action='/login?/signout',
                    use:enhance
                  )
                    LogOut.h-4.w-4.opacity-50.group-hover_opacity-75
                    button.whitespace-nowrap.text-base.font-medium.leading-7(type='submit') Log Out</template>
