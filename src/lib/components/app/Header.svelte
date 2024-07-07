<script lang="ts">
  import { PUBLIC_PRODUCT_NAME, PUBLIC_ORIGIN } from '$env/static/public'
  import Container from '../common/Container.svelte'
  import DropdownMenu from '../common/DropdownMenu.svelte'
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
          h1: a.flex.items-center.gap-4(href='{PUBLIC_ORIGIN}/app', class='-m-1.5 p-1.5')
            img.h-8.w-auto(src='logo.svg', alt='')
            span.sr-only {PUBLIC_PRODUCT_NAME}
        .hidden.md_flex.md_gap-x-8
          +each('navigation as item')
            a.text-sm.font-medium.leading-6.text-content-heading(href='{PUBLIC_ORIGIN}{ item.href }') {item.label}

        +if('$page.data.user')
          .flex.flex-1.justify-end
            DropdownMenu(menuLabel='Account', menuItems='{ accountNavigation }')
              form.hover_bg-surface-light-50.group.flex.w-full.cursor-pointer.items-center.gap-x-3.rounded-md.px-6.py-3.pr-16(
                method='post',
                action='{PUBLIC_ORIGIN}/signout',
                use:enhance
              )
                LogOut.h-4.w-4.opacity-50.transition.duration-200.group-hover_opacity-100
                button.text-left.text-sm.font-medium.leading-6.text-content-heading.group-hover_text-content-heading(
                  type='submit'
                ) Sign Out
          +else
            .flex.flex-1.items-center.justify-end.gap-x-7
              a.hidden.whitespace-nowrap.lg_block.lg_text-sm.lg_font-medium.lg_leading-6.lg_text-content-heading(
                href='{PUBLIC_ORIGIN}/signin'
              ) Sign In
              a.whitespace-nowrap.rounded-md.bg-action.px-3.py-2.text-sm.font-medium.text-white.shadow-sm.hover_bg-action-hover.focus-visible_outline.focus-visible_outline-2.focus-visible_outline-offset-2.focus-visible_outline-action(
                href='{PUBLIC_ORIGIN}/signin'
              ) Launch App
        .flex.md_hidden
          button.inline-flex.items-center.justify-center.rounded-md.text-content-body(
            type='button',
            class='-m-2.5 p-2.5',
            on:click!='{ () => mobileMenuOpen = true }'
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
              h1: a.flex.items-center.gap-5(href='{PUBLIC_ORIGIN}/', class='-m-1.5 p-1.5')
                img.h-8.w-auto(src='logo.svg', alt='')
                span.font-display.text-xl.font-medium.text-content-heading.sm_sr-only {PUBLIC_PRODUCT_NAME}
              +if('!$page.data.user')
                a.ml-auto.whitespace-nowrap.rounded-md.bg-action.px-3.py-2.text-sm.font-medium.text-white.shadow-sm.hover_bg-action-hover.focus-visible_outline.focus-visible_outline-2.focus-visible_outline-offset-2.focus-visible_outline-action(
                  href='{PUBLIC_ORIGIN}/signin'
                ) Sign Up
              button.rounded-md.text-content-body(
                type='button',
                class='-m-2.5 p-2.5',
                on:click!='{ () => mobileMenuOpen = false }'
              )
                span.sr-only Close menu
                X.h-6.w-6.opacity-50.transition.duration-150.hover_opacity-100(strokeWidth='1.5', aria-hidden='true')
            .mt-6.flow-root
              .-my-6.divide-y(class='divide-rule/10')
                .space-y-2.py-6
                  +each('navigation as item')
                    a.hover_bg-surface-light-50.-mx-3.block.rounded-lg.px-3.py-2.text-base.font-medium.leading-7.text-content-heading(
                      href='{PUBLIC_ORIGIN}{ item.href }'
                    ) {item.label}
                .py-6
                  form.hover_bg-surface-light-50.group.-mx-3.flex.cursor-pointer.items-center.gap-x-3.rounded-md.px-3.py-2(
                    method='post',
                    action='{PUBLIC_ORIGIN}/signout',
                    use:enhance
                  )
                    LogOut.h-4.w-4.opacity-50.group-hover_opacity-75
                    button.whitespace-nowrap.text-base.font-medium.leading-7(type='submit') Sign Out</template>
