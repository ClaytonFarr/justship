<script lang="ts">
	import type { Snippet } from 'svelte';
	let { children }: { children: Snippet } = $props();
</script>

<template lang="pug">
  .mx-auto.max-w-7xl.px-4.sm_px-6.lg_px-8
   | {@render children()}
</template>
