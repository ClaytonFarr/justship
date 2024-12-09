<script lang="ts">
  import { dev } from '$app/environment'
  import { PUBLIC_PRODUCT_NAME, PUBLIC_ORIGIN } from '$env/static/public'
  import DropdownMenu from '$components/ui/custom/DropdownMenu.svelte'
  import { Menu, X, LogOut } from 'lucide-svelte'
  import { page } from '$app/stores'
  import { enhance } from '$app/forms'
  import type { Link } from '$lib/types'
  import { afterNavigate } from '$app/navigation'

  const rootUrl = dev ? 'http://localhost:5173' : PUBLIC_ORIGIN
  let mobileMenuOpen: boolean = $state(false)

  // Close menu after navigation
  afterNavigate(() => {
    mobileMenuOpen = false
  })

  // Handler for sign out form
  const handleSignOut = () => {
    mobileMenuOpen = false
    return async ({ update }: { update: () => Promise<void> }) => {
      await update()
    }
  }

  interface Props {
    navigation?: Link[];
    accountNavigation?: Link[];
  }

  let { navigation = [
    { label: 'Dashboard', href: '/app' },
    { label: 'New', href: '/app/new' },
    { label: 'All', href: '/app/all' },
  ], accountNavigation = [
    { label: 'Settings', href: '/app/settings'},
  ] }: Props = $props();

  const isActive = (href: string): boolean => $page.url.pathname === href
</script>

<template lang="pug">
  header.border-b.bg-white(class='border-rule-light/75')
    .container
      nav.flex.h-20.items-center.justify-between.gap-x-8.py-6.lg_py-8(aria-label='Global')
        .flex
          h1: a.flex.items-center.gap-4(href='{rootUrl}/app', class='-m-1.5 p-1.5')
            img.h-8.w-auto(src='/logo.svg', alt='')
            span.font-display.text-xl.font-medium.text-content-heading.sm_sr-only {PUBLIC_PRODUCT_NAME}

        .hidden.md_flex.md_gap-x-8
          +each('navigation as item')
            a.text-sm.font-medium.leading-6.transition(
              href='{rootUrl}{ item.href }',
              class!='{ isActive(item.href) ? "text-action cursor-default" : "text-content-heading hover_text-action" }'
            ) {item.label}

        +if('$page.data.user')
          .hidden.md_flex.flex-1.justify-end
            DropdownMenu(menuLabel='Account', menuItems='{ accountNavigation }')
              form.hover_bg-surface-light-50.group.flex.w-full.cursor-pointer.items-center.gap-x-3.rounded-md.px-6.py-3.pr-16(
                method='post',
                action='{rootUrl}/signout',
                use:enhance
              )
                LogOut.h-4.w-4.opacity-50.transition.duration-200.group-hover_opacity-100
                button.text-left.text-sm.font-medium.leading-6.text-content-heading.group-hover_text-content-heading(
                  type='submit'
                ) Sign Out
          +else
            .flex.flex-1.items-center.justify-end.gap-x-7
              a.hidden.whitespace-nowrap.lg_block.lg_text-sm.lg_font-medium.lg_leading-6.lg_text-content-heading(
                href='{rootUrl}/signin'
              ) Sign In
              a.whitespace-nowrap.rounded-md.bg-action.px-3.py-2.text-sm.font-medium.text-white.shadow-sm.hover_bg-action-hover.focus-visible_outline.focus-visible_outline-2.focus-visible_outline-offset-2.focus-visible_outline-action(
                href='{rootUrl}/signin'
              ) Launch App

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
              h1: a.flex.items-center.gap-4(href='{rootUrl}/', class='-m-1.5 p-1.5')
                img.h-8.w-auto(src='/logo.svg', alt='')
                span.font-display.text-xl.font-medium.text-content-heading.sm_sr-only {PUBLIC_PRODUCT_NAME}
              +if('!$page.data.user')
                a.ml-auto.whitespace-nowrap.rounded-md.bg-action.px-3.py-2.text-sm.font-medium.text-white.shadow-sm.hover_bg-action-hover.focus-visible_outline.focus-visible_outline-2.focus-visible_outline-offset-2.focus-visible_outline-action(
                  href='{rootUrl}/signin'
                ) Sign Up
              button.rounded-md.text-content-body(
                type='button',
                class='-m-2.5 p-2.5',
                onclick!='{ () => mobileMenuOpen = false }'
              )
                span.sr-only Close menu
                X.h-6.w-6.opacity-50.transition.duration-150.hover_opacity-100(strokeWidth='1.5', aria-hidden='true')
            .mt-6.flow-root
              .-my-6.divide-y(class='divide-rule/10')
                .space-y-2.py-6
                  +each('navigation as item')
                    a.hover_bg-surface-light-50.-mx-3.block.rounded-lg.px-3.py-2.text-base.font-medium.leading-7(
                      class!='{ isActive(item.href) ? "text-action" : "text-content-heading" }',
                      href='{rootUrl}{ item.href }'
                    ) {item.label}
                .space-y-2.py-6
                  +each('accountNavigation as item')
                    a.hover_bg-surface-light-50.-mx-3.block.rounded-lg.px-3.py-2.text-base.font-medium.leading-7(
                      class!='{ isActive(item.href) ? "text-action" : "text-content-heading" }',
                      href='{rootUrl}{ item.href }'
                    ) {item.label}
                .py-6
                  form.hover_bg-surface-light-50.group.-mx-3.flex.cursor-pointer.items-center.gap-x-3.rounded-md.px-3.py-2(
                    method='post',
                    action='{rootUrl}/signout',
                    use:enhance='{handleSignOut}'
                  )
                    LogOut.h-4.w-4.opacity-50.group-hover_opacity-75
                    button.whitespace-nowrap.text-base.font-medium.leading-7(type='submit') Sign Out
</template>
