<script lang="ts">
  import Container from '$components/common/Container.svelte'
  import HeroImage from '$components/marketing/HeroImage.svelte'
  import HeroProduct from '$components/marketing/HeroProduct.svelte'
  import Features01 from '$components/marketing/Features01.svelte'
  import Features02 from '$components/marketing/Features02.svelte'
</script>

<template lang="pug">
  main
    //- HeroImage(reversedText)
    HeroProduct
    Features01
    Features02</template>
