<script lang="ts">
	import type { Faq } from '$lib/types';
	import Container from './Container.svelte';

	const faqs: Array<Faq> = [
		{
			question: 'What is Just Ship?',
			answer: 'test'
		},
		{
			question: 'How do I get started?',
			answer: 'test'
		},
		{
			question: 'How can I support Just Ship?',
			answer: 'test'
		}
	];
</script>

<Container>
	<div id="faq" class="mx-auto max-w-2xl py-24 sm_py-32">
		<div class="mt-2 text-center text-3xl font-bold tracking-tight sm_text-4xl">FAQ</div>
		<div class="text-md mt-2 text-center leading-6 sm_mt-4 sm_text-lg sm_leading-8">Still have questions? We've got you covered!</div>
		<div class="mt-5 md_mt-8 lg_mt-10">
			<div class="join join-vertical w-full">
				{#each faqs as faq}
					<div class="collapse join-item collapse-arrow border">
						<input type="radio" name="accordion" />
						<div class="collapse-title text-xl font-medium">
							{faq.question}
						</div>
						<div class="collapse-content">
							<p>{@html faq.answer}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</Container>
