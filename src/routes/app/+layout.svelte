<script lang="ts">
  import Header from '$components/app/Header.svelte'

let { children } = $props()
</script>

<template lang="pug">
  .min-h-dvh.bg-surface-light
    Header
    .container.py-8
      | {@render children()}
</template>
