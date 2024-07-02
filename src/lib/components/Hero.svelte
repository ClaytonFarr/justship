<script>
	import { Ship } from 'lucide-svelte';
	import Container from './Container.svelte';
</script>

<!-- The exact line breaks and widths of various sections should depend on the copy. Make sure the copy looks good on
all screen sizes (not the case here) -->
<Container>
	<div class="flex flex-col py-8 sm_py-20 md_flex-row">
		<div>
			<div class="text-center text-4xl font-bold sm_mt-8 sm_text-left sm_text-7xl">
				You put your apps <br /> <span class="text-secondary">main promise</span> <br /> right
				<span class="underline decoration-primary">here</span>
			</div>
			<p class="text-md mb-6 mt-2 text-center sm_mb-8 sm_mt-4 sm_text-left sm_text-lg">
				You can put some subtext here about with a further explanation <br class="hidden sm_block" /> of what features your app has to offer.
			</p>
			<div class="flex items-center justify-center sm_justify-start">
				<a href="/" class="btn btn-primary h-14 w-full max-w-sm text-lg">
					<Ship class="mr-2" /> Your call to action
				</a>
			</div>
		</div>
		<div class=" mt-8 flex-1 rounded-xl bg-gray-100 p-10 text-center text-xl md_ml-5">
			You can put lots of things in this section. A quick demo video of your product, a carousel of images, some testimonials or relevant logos. Be creative!
		</div>
	</div>
</Container>
