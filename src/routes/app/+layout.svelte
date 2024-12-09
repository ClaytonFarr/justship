<script lang="ts">
  import Header from '$components/ui/custom/Header.svelte'

let { children } = $props()
</script>

<template lang="pug">
  .min-h-dvh.bg-muted
    Header
    .container.py-8
      | {@render children()}
</template>
