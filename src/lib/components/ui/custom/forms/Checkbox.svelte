<script lang="ts">
  interface Props {
    id: string;
    label: string;
    hiddenLabel?: boolean;
    secondaryLabel?: boolean;
    name?: string;
    checked?: boolean;
  }

  let {
    id,
    label,
    hiddenLabel = false,
    secondaryLabel = false,
    name = id,
    checked = $bindable(false)
  }: Props = $props();
</script>

<template lang="pug">
  // prettier-ignore
  label(for='{id}').flex.items-center
    input(type='checkbox', id='{id}' name='{name}' bind:checked onchange!='{() => {}}').text-action.focus_ring-action.h-4.w-4.rounded.border-input
    span(class:sr-only='{hiddenLabel}' class!='{secondaryLabel ? "text-muted-foreground" : "text-foreground"}').ml-3.block.text-sm.leading-6 {label}
</template>
