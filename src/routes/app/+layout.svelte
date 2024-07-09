<script lang="ts">
  import Header from '$components/app/Header.svelte'
  import Container from '$components/common/Container.svelte'
  let { children } = $props()
</script>

<template lang="pug">
  Header
  Container
    | {@render children()}</template>
