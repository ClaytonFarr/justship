<script lang="ts">
  import { Eye, EyeOff } from 'lucide-svelte'
  interface Props {
    id: string;
    name?: string;
    label: string;
    placeholder: string;
    type?: string;
    value?: string;
    required?: boolean;
    autocomplete?: string;
    autofocus?: boolean;
    showPassword?: boolean;
    large?: boolean;
  }

  let {
    id,
    name = id,
    label,
    placeholder,
    type = 'text',
    value = $bindable(''),
    required = false,
    autocomplete = 'off',
    autofocus = false,
    showPassword = $bindable(false),
    large = false
  }: Props = $props();

  function toggleShowPassword() {
    showPassword = !showPassword
  }
</script>

<!-- svelte-ignore a11y_autofocus -->
<template lang="pug">
  label.block.flex-1.space-y-2(for='{ id }')
    span.text-foreground.block.text-sm.font-medium.leading-6 {label}
    .relative
      // prettier-ignore
      input.focus_ring-action.block.w-full.rounded-md.border-0.shadow-sm.ring-1.ring-inset.ring-input.placeholder_text-muted-foreground.focus_ring-2.focus_ring-inset.sm_text-sm.sm_leading-6.large(id='{id}',
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
        onclick='{ toggleShowPassword }',
        class='top-[2px] right-[2px] bottom-[2px]',
        type='button',
        )
          span.sr-only Show / Hide
          +if('showPassword')
            EyeOff.text-muted-foreground.transition.hover_text-action(size=18)
            +else
              Eye.text-muted-foreground.transition.hover_text-action(size=18)</template>
