<script lang="ts">
  export let href: string
  export let label: string
  export let large: boolean = false
  export let rounded: boolean = false
  export let fullWidth: boolean = false
  export let filled: boolean = false
  export let outlined: boolean = false
  export let button: boolean = filled || outlined ? true : false
  export let shadow: boolean = false
  export let additionalClasses: string = ''
</script>

<template lang="pug">
  +if('button')
    // prettier-ignore
    a.inline-block.font-medium.text-center.whitespace-nowrap.hover_-translate-y-px.transition.duration-150.ease-out(
      href='{ href }',
      class='{ additionalClasses }',
      class!='{ large ? "text-base px-5 py-3.5" : "text-sm px-3.5 py-2.5" }',
      class!='{ fullWidth ? "w-full" : "" }', 
      class!='{ rounded ? "rounded-full px-7" : "rounded-md" }',
      class!='{ shadow ? "shadow-sm" : "" }',
      class!='{ outlined ? "!text-action hover_!text-action-hover !ring-action/30  ring-1 ring-inset focus-visible_outline focus-visible_outline-2 focus-visible_outline-offset-2 focus-visible_outline-action dark_ring-action-hover/60 dark_bg-white/10 dark_hover_bg-white hover_ring-action/60" : "" }', 
      class!='{ filled ? "text-content-body-reversed bg-action-hover bg-gradient-to-br from-action-hover to-action hover_bg-none border border-solid border-transparent ring-1 ring-inset focus-visible_outline focus-visible_outline-2 focus-visible_outline-offset-2 focus-visible_outline-action" : "text-content-body hover_text-action dark_text-content-secondary-reversed dark_hover_text-white" }',
    ) {label}
    +else
      // prettier-ignore
      a.font-medium.leading-6.transition.dark_text-content-secondary-reversed.dark_hover_text-white.text-content-body.hover_text-action.whitespace-nowrap(
        href='{ href }'
        class='{ additionalClasses }',
        class!='{ large ? "text-base" : "text-sm" }',
      ) {label}</template>
