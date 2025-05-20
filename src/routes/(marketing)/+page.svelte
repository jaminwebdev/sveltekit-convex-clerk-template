<script lang="ts">
	import Container from '@/lib/components/Container.svelte';
	import MarketingFeatures from '@/lib/components/marketing/sections/MarketingFeatures.svelte';
	import MarketingInfo from '@/lib/components/marketing/sections/MarketingInfo.svelte';
	import MarketingInsights from '@/lib/components/marketing/sections/MarketingInsights.svelte';
	import MarketingTeam from '@/lib/components/marketing/sections/MarketingTeam.svelte';
	import MarketingTestimonials from '@/lib/components/marketing/sections/MarketingTestimonials.svelte';
	import { Button } from '@/lib/components/ui/button';
</script>

<section class="mx-auto max-w-screen-2xl px-4 md:px-8">
	<Container>
		<div class="my-20 flex flex-wrap justify-between md:mb-16">
			<div
				class="mb-6 flex w-full flex-col justify-center gap-4 sm:mb-12 lg:mb-0 lg:w-1/3 lg:pt-36 lg:pb-16"
			>
				<h1>
					Find your<br />style online
				</h1>

				<p class="max-w-md leading-relaxed">
					This is a section of some simple filler text, also known as placeholder text. It shares
					characteristics of real text.
				</p>
				<Button class="self-start">Learn More</Button>
			</div>

			<div class="mb-12 flex w-full md:mb-16 lg:w-2/3">
				<div
					class="relative top-12 left-12 z-10 -ml-12 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:top-16 md:left-16 lg:ml-0"
				>
					<img
						src="https://images.unsplash.com/photo-1542340916-951bb72c8f74?auto=format&q=75&fit=crop&w=550&h=550"
						loading="lazy"
						alt="Woman in front of neon signs"
						class="h-full w-full object-cover object-center"
					/>
				</div>

				<div class="overflow-hidden rounded-lg bg-gray-100 shadow-lg">
					<img
						src="https://images.unsplash.com/photo-1586295166487-b265f7e83a7f?auto=format&q=75&fit=crop&w=550&h=550"
						loading="lazy"
						alt="Woman in front of neon signs"
						class="h-full w-full object-cover object-center"
					/>
				</div>
			</div>
		</div>
	</Container>
</section>
<MarketingFeatures />
<MarketingInfo />
<MarketingTestimonials />
<MarketingTeam />
<MarketingInsights />
