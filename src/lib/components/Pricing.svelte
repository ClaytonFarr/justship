<script lang="ts">
	import { Check, Ship, X } from 'lucide-svelte';
	import Container from './Container.svelte';

	const featuresBasic = {
		included: ['Feature 1', 'Feature 2', 'Feature 3'],
		excluded: ['Feature 4', 'Feature 5', 'Feature 6']
	};

	const featuresPremium = {
		included: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5', 'Feature 6']
	};
</script>

<!-- premium package -->
<!-- <div class="card">
	<h3>{title}</h3>
	<div>${price}usd</div>
	<ul>
		{#each features as feature}
			<li><Check /> {feature}</li>
		{/each}
	</ul>
	<a class="btn" href="/">Get Justship</a>
</div> -->

<Container>
	<div id="pricing" class="py-24 sm_py-32">
		<h2 class="text-md text-center text-base font-semibold leading-7 text-base-content/70">Pricing</h2>
		<div class="mb-10 mt-2 text-center text-2xl font-bold tracking-tight sm_mb-20 sm_text-4xl">Choose the right plan for you</div>
		<div class="mx-auto flex w-fit flex-wrap justify-center gap-10 md_gap-16">
			<!-- Basic package -->
			<div class="card w-80 p-8 shadow-xl ring-2 ring-base-200">
				<h3 class="mb-2 text-xl font-extrabold text-base-content text-opacity-80">Basic</h3>
				<div class="text-5xl font-extrabold leading-snug">
					$100 <span class="text-base font-bold">usd</span>
				</div>
				<ul class="mb-20 mt-3 space-y-2">
					{#each featuresBasic.included as feature}
						<li class="flex items-center space-x-2">
							<Check strokeWidth={1} class="text-primary" />
							<div class="text-base-content text-opacity-80">{feature}</div>
						</li>
					{/each}
					{#each featuresBasic.excluded as feature}
						<li class="flex space-x-2 text-base-content text-opacity-60">
							<X strokeWidth={1} />
							<div class="line-through">{feature}</div>
						</li>
					{/each}
				</ul>
				<a class="btn mt-auto" href="/"><Ship /> Get Product</a>
			</div>

			<!-- Premium package -->
			<div class="card relative w-80 p-8 shadow-xl ring-2 ring-primary">
				<div class="absolute right-5 top-5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold leading-5 text-primary">Most popular</div>

				<h3 class="mb-2 text-xl font-extrabold text-base-content text-opacity-80">Premium</h3>
				<div class="text-5xl font-extrabold leading-snug">
					$120 <span class="text-base font-bold">usd</span>
				</div>
				<ul class="mb-20 mt-3 space-y-2">
					{#each featuresPremium.included as feature}
						<li class="flex items-center space-x-2">
							<Check strokeWidth={1} class="text-primary" />
							<div class="text-base-content text-opacity-80">{feature}</div>
						</li>
					{/each}
				</ul>
				<a class="btn btn-primary mt-auto" href="/"><Ship /> Get Product</a>
			</div>
		</div>
	</div>
</Container>
