<script lang="ts">
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'
  import { cubicInOut } from 'svelte/easing'
  import { marketingContent } from '$lib/data/marketingContent'

  import Header from '$components/marketing/Header.svelte'
  import Hero from '$components/marketing/Hero.svelte'
  import Features from '$components/marketing/Features.svelte'
  import CallToAction from '$components/marketing/CallToAction.svelte'
  import Pricing from '$components/marketing/Pricing.svelte'
  import Faqs from '$components/marketing/Faqs.svelte'
  import Footer from '$components/marketing/Footer.svelte'

  import type { Link } from '$lib/types'

  const isProduction = import.meta.env.PROD

  let { children } = $props()

  // Header Content
  const headerNavAlignment = 'right'
  const headerNavItems: Link[] = [
    ...(marketingContent.features ? [{ label: 'Product', href: '#features' }] : []),
    ...(marketingContent.pricing ? [{ label: 'Pricing', href: '#pricing' }] : []),
  ].filter(Boolean)
  const headerCta = {
    include: true,
    label: 'Get Started Today',
    href: '/signin?new',
  }

  // Header animates in/out view when user scrolls from/to top of page
  let headerVisible = $state(false)
  let lastScrollY = $state(0)
  let scrollStartFromTopVh = $state(0.6) // when to show header; 1 = 1 viewport height; based on viewport scroll top position
  onMount(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      headerVisible = currentScrollY > window.innerHeight * scrollStartFromTopVh
      lastScrollY = currentScrollY
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })
</script>

<template lang="pug">
  +if('headerVisible')
    .fixed.inset-x-0.top-0.z-50.shadow-md(transition:fade='{{ duration: 200, easing: cubicInOut }}')
      Header(navItems='{ headerNavItems }', navAlignment='{ headerNavAlignment }', cta='{ headerCta }')

  // prettier-ignore
  main
    p isProduction: {isProduction}
    +if('marketingContent.hero')
      Hero(content='{ marketingContent.hero }', reversed, id='hero')

    +if('marketingContent.features')
      Features(content='{ marketingContent.features }' id='features')

    +if('marketingContent.cta')
      CallToAction(content='{ marketingContent.cta }', reversed)

    +if('marketingContent.pricing')
      Pricing#pricing(content='{ marketingContent.pricing }')

    +if('marketingContent.faqs')
      Faqs(content='{ marketingContent.faqs }', reversed, id='faqs')

    Footer(content='{ marketingContent.footer }', reversed, id='footer')

  //- hack to keep prettier from moving closing template tag
  span</template>
