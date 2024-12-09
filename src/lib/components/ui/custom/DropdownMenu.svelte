<script lang="ts">
  import { onMount, type Snippet } from 'svelte'
  import { ChevronDown } from 'lucide-svelte'
  import type { Link } from '$lib/types'

  interface Props {
    menuLabel?: string;
    menuItems?: Link[];
    slotBorder?: boolean;
    children?: Snippet;
  }

  let { menuLabel = 'Menu', menuItems = [
    {
      label: 'Item One',
      href: '#',
    },
    {
      label: 'Item Two',
      href: '#',
    },
  ],
    slotBorder = false,
    children,
  }: Props = $props();

  let isOpen: boolean = $state(false)
  let container: HTMLDivElement
  let buttonElement: HTMLButtonElement
  let menuElement = $state<HTMLDivElement | null>(null);
  let menuPosition: 'center' | 'left' | 'right' = $state('center')

  function toggleMenu(): void {
    isOpen = !isOpen
  }
  function onWindowClick(event: MouseEvent) {
    if (!container.contains(event.target as Node)) {
      isOpen = false
    } else if (menuElement?.contains(event.target as Node)) {
      const target = event.target as HTMLElement
      const isFormButton = target.tagName === 'BUTTON' && target.closest('form')
      
      // Don't close if it's a form button (like sign out)
      if (!isFormButton) {
        isOpen = false
      }
    }
  }

  function setMenuPosition() {
    if (buttonElement && menuElement) {
      const buttonRect = buttonElement.getBoundingClientRect()
      const menuRect = menuElement.getBoundingClientRect()
      const viewportWidth = window.innerWidth

      const buttonCenter = buttonRect.left + buttonRect.width / 2
      const menuHalfWidth = menuRect.width / 2

      if (buttonCenter - menuHalfWidth < 0) {
        menuPosition = 'left'
      } else if (buttonCenter + menuHalfWidth > viewportWidth) {
        menuPosition = 'right'
      } else {
        menuPosition = 'center'
      }
    }
  }

  onMount(() => {
    window.addEventListener('resize', setMenuPosition)
    return () => window.removeEventListener('resize', setMenuPosition)
  })

  $effect(() => {
    if (isOpen) {
      setTimeout(setMenuPosition, 0)
    }
  });
</script>

<svelte:window onclick={onWindowClick} />

<template lang="pug">
  .relative(bind:this='{ container }')
    button.inline-flex.items-center.gap-x-2.text-sm.font-medium.leading-6.text-foreground(
      type='button',
      aria-expanded='{ isOpen }',
      onclick='{ toggleMenu }',
      bind:this='{ buttonElement }'
    )
      span { menuLabel }
      ChevronDown.h-4.w-4(aria-hidden='true')

    +if('isOpen')
      // prettier-ignore
      .absolute.z-10.mt-5.w-screen.sm_w-max.px-4(
        class!='{isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}',
        class!='{menuPosition === "left" ? "-left-4" : ""}',
        class!='{menuPosition === "right" ? "-right-4" : ""}',
        class!='{menuPosition === "center" ? "left-1/2 -translate-x-1/2" : ""}',
        bind:this='{ menuElement }'
        )
        .w-screen.sm_w-auto.max-w-sm.flex-auto.rounded-lg.bg-white.text-sm.leading-6.shadow-lg.ring-1(class='ring-input/50')
          .py-2
            +each('menuItems as item')
              .relative.rounded-md.px-6.py-3.pr-16.hover_bg-muted-50
                a.font-medium.text-foreground(href='{ item.href }')
                  | { item.label }
                  span.absolute.inset-0
                p.mt-1.text-muted-foreground { item.description }
          div(class!='{slotBorder ? "border-t border-1 border-input py-2" : "-mt-2 pb-2"}')
            +if('children')
              | {@render children()}

</template>
