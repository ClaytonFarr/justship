<script lang="ts">
  import HeaderMarketing from '$lib/components/HeaderMarketing.svelte'
  let { children } = $props()
</script>

<template lang="pug">
  HeaderMarketing
  | {@render children()}</template>
