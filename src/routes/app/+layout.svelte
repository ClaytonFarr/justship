<script lang="ts">
  import HeaderApp from '$lib/components/HeaderApp.svelte'
  let { children } = $props()
</script>

<template lang="pug">
  HeaderApp
  | {@render children()}</template>
