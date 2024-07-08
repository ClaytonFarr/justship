<script lang="ts">
  import Hero from '$components/marketing/Hero.svelte'
  import Features from '$components/marketing/Features.svelte'
  import CallToAction from '$components/marketing/CallToAction.svelte'
  import Pricing from '$components/marketing/Pricing.svelte'
  import Faqs from '$components/marketing/Faqs.svelte'
  import Footer from '$components/marketing/Footer.svelte'
  import { marketingContent } from '$lib/data/marketingContent'
</script>

<template lang="pug">
  main
    +if('marketingContent.hero')
      Hero(content='{ marketingContent.hero }', reversed)
    +if('marketingContent.features')
      Features(content='{ marketingContent.features }')
    +if('marketingContent.cta')
      CallToAction(content='{ marketingContent.cta }', reversed)
    +if('marketingContent.pricing')
      Pricing(content='{ marketingContent.pricing }')
    +if('marketingContent.faqs')
      Faqs(content='{ marketingContent.faqs }', reversed)
    Footer(content='{ marketingContent.footer }', reversed)
</template>
