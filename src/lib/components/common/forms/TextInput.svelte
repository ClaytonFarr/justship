<script lang="ts">
  import { Eye, EyeOff } from 'lucide-svelte'
  export let id: string
  export let name: string = id
  export let label: string
  export let placeholder: string
  export let type: string = 'text'
  export let value: string = ''
  export let required: boolean = false
  export let autocomplete: string = 'off'
  export let autofocus: boolean = false
  export let showPassword: boolean = false
  export let large: boolean = false

  function toggleShowPassword() {
    showPassword = !showPassword
  }
</script>

<!-- svelte-ignore a11y_autofocus -->
<template lang="pug">
  label.block.flex-1.space-y-2(for='{ id }')
    span.text-content-heading.block.text-sm.font-medium.leading-6 {label}
    .relative
      // prettier-ignore
      input.focus_ring-action.block.w-full.rounded-md.border-0.shadow-sm.ring-1.ring-inset.ring-input.placeholder_text-content-tertiary.focus_ring-2.focus_ring-inset.sm_text-sm.sm_leading-6.large(id='{id}',
        name='{ name }',
        type!='{ showPassword ? "text" : type }',
        placeholder='{ placeholder }',
        required='{ required }',
        autocomplete='{ autocomplete }',
        bind:value,
        class!='{ large ? "h-input-lg" : "h-input" } { showPassword ? "pr-12" : "" }',
        autofocus='{ autofocus }'
      )
      +if("type === 'password'")
        // prettier-ignore
        button.absolute.inline-flex.items-center.justify-center.rounded-md.rounded-l-none.px-4.bg-white(
        on:click='{ toggleShowPassword }',
        class='top-[2px] right-[2px] bottom-[2px]',
        type='button',
        )
          span.sr-only Show / Hide
          +if('showPassword')
            EyeOff.text-content-tertiary.transition.hover_text-action(size=18)
            +else
              Eye.text-content-tertiary.transition.hover_text-action(size=18)</template>
