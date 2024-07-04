<script lang="ts">
  import Header from '$components/marketing/Header.svelte'
  let { children } = $props()
</script>

<template lang="pug">
  Header
  | {@render children()}</template>
