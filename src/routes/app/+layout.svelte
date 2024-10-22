<script lang="ts">
  import Header from '$components/app/Header.svelte'
  import Container from '$components/common/Container.svelte'
  let { children } = $props()
</script>

<template lang="pug">
  .min-h-dvh.bg-surface-light
    Header
    Container(additionalClasses='py-8')
      | {@render children()}
</template>
