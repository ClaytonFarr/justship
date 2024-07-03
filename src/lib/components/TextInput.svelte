<script lang="ts">
  export let id: string
  export let name: string = id
  export let label: string
  export let placeholder: string
  export let type: string = 'text'
  export let value: string = ''
  export let required: boolean = false
  export let autocomplete: string = 'off'
  export let large: boolean = false
</script>

<template lang="pug">
  label.block.space-y-2(for='{ id }')
    span.block.text-sm.font-medium.leading-6.text-gray-900 {label}
    // prettier-ignore
    input.focus_ring-action.block.w-full.rounded-md.border-0.shadow-sm.ring-1.ring-inset.ring-gray-300.placeholder_text-gray-400.focus_ring-2.focus_ring-inset.sm_text-sm.sm_leading-6.large(id='{id}',
      name='{ name }',
      type='{ type }',
      placeholder='{ placeholder }',
      required='{ required }',
      autocomplete='{ autocomplete }',
      bind:value,
      class!='{ large ? "h-input-lg" : "h-input" }'
    )</template>
