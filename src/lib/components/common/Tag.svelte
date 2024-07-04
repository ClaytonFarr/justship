<script lang="ts">
  export let label: string
  export let filled: boolean = false
  export let iconLeft
  export let iconRight
  export let href: string
</script>

<!-- svelte-ignore a11y_missing_content -->
<template lang="pug">
  +if('href')
    a(href='{ href }')
    +else
      +if('filled')
        span.inline-flex.items-center.space-x-1.rounded-full.px-3.py-1.text-sm.font-medium.leading-6.text-action.ring-1.ring-inset(class='bg-action/10 ring-action/10')
          +if('iconLeft')
            svelte:component.h-5.w-5(this='{ iconLeft }')
          span {label}
          +if('iconRight')
            svelte:component.h-5.w-5(this='{ iconRight }')
        +else
          span.inline-flex.items-center.space-x-1.text-sm.font-medium.leading-6.text-content-secondary
            +if('iconLeft')
              svelte:component.h-5.w-5.text-content-tertiary(this='{ iconLeft }')
            span {label}
            +if('iconRight')
              svelte:component.h-5.w-5.text-content-tertiary(this='{ iconRight }')</template>
