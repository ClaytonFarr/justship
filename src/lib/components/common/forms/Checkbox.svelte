<script lang="ts">
  export let id: string
  export let label: string
  export let name: string = id
  export let checked: boolean = false
</script>

<template lang="pug">
  // prettier-ignore
  label(for='{id}').flex.items-center
    input(type='checkbox', id='{id}' name='{name}' bind:checked).text-action.focus_ring-action.h-4.w-4.rounded.border-input
    span.ml-3.block.text-sm.leading-6.text-content-body {label}</template>
