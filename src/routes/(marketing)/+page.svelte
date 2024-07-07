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
    Hero(content='{ marketingContent.hero }', reversed)
    Features(content='{ marketingContent.features }')
    CallToAction(content='{ marketingContent.cta }', reversed)
    Pricing(content='{ marketingContent.pricing }')
    Faqs(content='{ marketingContent.faqs }', reversed)
    Footer(content='{ marketingContent.footer }', reversed)</template>
