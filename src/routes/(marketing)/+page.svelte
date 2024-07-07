<script lang="ts">
  import Container from '$components/common/Container.svelte'
  import Hero from '$components/marketing/Hero.svelte'
  import Features from '$components/marketing/Features.svelte'
</script>

<template lang="pug">
  main
    Hero(reversed)
    Hero
    Features(reversed)
    Features</template>
