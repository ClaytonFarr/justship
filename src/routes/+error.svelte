<script>
  import { page } from '$app/stores'
  import Container from '$lib/components/Container.svelte'
</script>

<template lang="pug">
  Container
    .flex.min-h-screen.flex-col.items-center.justify-center.align-middle
      .text-content-heading.mb-4.flex.items-center.justify-items-stretch.divide-x.border
        h1.px-3.text-lg.font-medium { $page.status }
        p.px-3.py-2
          +if('$page.status === 404')
            | The page you are looking for does not exist.
            +elseif('$page.error.message')
              | {$page.error.message}
            +else
              | We encountered a site error.
      p.mt-8: a.text-action.underline(href='/') &rarr; Return Home</template>
