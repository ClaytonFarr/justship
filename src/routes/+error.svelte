<script>
	import { page } from '$app/stores';
	import Container from '$lib/components/Container.svelte';
</script>

<template lang="pug">

	Container
		main.grid.min-h-full.place-items-center.px-6.py-24.sm_py-32
			h1.text-error.text-4xl.font-bold.text-center {$page.status}
			div
				p.text-center.text-lg.mt-4(class='text-base-content/80')
					+if('$page.status === 404')
						| The page you are looking for does not exist.
						+else
							| An error occurred.
				p.text-center.mt-10
					a.btn(href='/') Return Home

</template>
