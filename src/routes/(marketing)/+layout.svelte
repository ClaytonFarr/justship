<script lang="ts">
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'
  import { cubicInOut } from 'svelte/easing'
  import Header from '$components/marketing/Header.svelte'

  let { children } = $props()

  // Animate header into view when scroll past top of page

  let headerVisible = $state(false)
  let lastScrollY = $state(0)
  let scrollStartFromTopVh = $state(1) // when to show header; 1 = 1 viewport height; based on viewport scroll top position
  onMount(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      headerVisible = currentScrollY > window.innerHeight * scrollStartFromTopVh
      lastScrollY = currentScrollY
    }
    handleScroll() // check scroll position on page load
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })
</script>

<template lang="pug">
  +if('headerVisible')
    .fixed.inset-x-0.top-0.z-10.shadow-md(transition:fade='{{ duration: 200, easing: cubicInOut }}')
      Header
  | {@render children()}</template>
