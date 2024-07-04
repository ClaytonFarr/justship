<script lang="ts">
  import Header from '$components/app/Header.svelte'
  let { children } = $props()
</script>

<template lang="pug">
  Header
  | {@render children()}</template>
