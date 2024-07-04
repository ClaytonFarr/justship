<script lang="ts">
  import { onMount } from 'svelte'
  import { ChevronDown } from 'lucide-svelte'
  import type { Link } from '$lib/types'

  export let menuLabel: string = 'Menu'
  export let menuItems: Link[] = [
    {
      label: 'Item One',
      href: '#',
      description: 'This is a description',
    },
    {
      label: 'Item Two',
      href: '#',
      description: 'This is a description',
    },
  ]
  export let slotBorder: boolean = false

  let isOpen: boolean = false
  let container: HTMLDivElement
  let buttonElement: HTMLButtonElement
  let menuElement: HTMLDivElement
  let menuPosition: 'center' | 'left' | 'right' = 'center'

  function toggleMenu(): void {
    isOpen = !isOpen
  }

  function onWindowClick(event: MouseEvent) {
    if (!container.contains(event.target as Node)) isOpen = false
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

  $: if (isOpen) {
    setTimeout(setMenuPosition, 0)
  }
</script>

<svelte:window on:click={onWindowClick} />

<template lang="pug">
  .relative(bind:this='{ container }')
    button.text-content-heading.inline-flex.items-center.gap-x-2.text-sm.font-medium.leading-6(
      type='button',
      aria-expanded='{ isOpen }',
      on:click='{ toggleMenu }',
      bind:this='{ buttonElement }'
    )
      span { menuLabel }
      svelte:component.h-4.w-4(this='{ ChevronDown }', aria-hidden='true')

    +if('isOpen')
      // prettier-ignore
      .absolute.z-10.mt-5.w-screen.sm_w-max.px-4(
        class!='{isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}',
        class!='{menuPosition === "left" ? "-left-4" : ""}',
        class!='{menuPosition === "right" ? "-right-4" : ""}',
        class!='{menuPosition === "center" ? "left-1/2 -translate-x-1/2" : ""}',
        bind:this='{ menuElement }'
        )
        .w-screen.sm_w-auto.max-w-sm.flex-auto.rounded-lg.bg-white.text-sm.leading-6.shadow-lg.ring-1(class='ring-input-dark/5')
          .py-2
            +each('menuItems as item')
              .relative.rounded-md.px-6.py-3.pr-16.hover_bg-surface-light-50
                a.font-medium.text-content-heading(href='{ item.href }')
                  | { item.label }
                  span.absolute.inset-0
                p.mt-1.text-content-secondary { item.description }
          div(class!='{slotBorder ? "border-t border-1 border-input-light py-2" : "-mt-2 pb-2"}')
            slot</template>
