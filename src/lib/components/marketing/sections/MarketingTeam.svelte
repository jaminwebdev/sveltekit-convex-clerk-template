<script lang="ts">
	import Container from '@/lib/components/Container.svelte';
	import PillSubheading from '@/lib/components/PillSubheading.svelte';
	import { Button } from '@/lib/components/ui/button';
</script>

<Container>
	<section class="py-10">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="flex flex-col items-center justify-between md:mt-20 lg:flex-row">
				<div class="grid w-full gap-5 lg:w-1/2">
					<PillSubheading classes="justify-self-start">Our Team</PillSubheading>
					<h2>Our leading, strong & creative team</h2>
					<p>These people work on making our product best.</p>
					<Button class="justify-self-start" size="lg">Join our Team</Button>
				</div>
				<div class="mt-16 w-full max-lg:max-w-2xl md:mt-40 lg:mt-0 lg:w-1/2">
					<div class="grid grid-cols-1 gap-8 min-[450px]:grid-cols-2 md:grid-cols-3">
						<img
							src="https://pagedone.io/asset/uploads/1696238644.png"
							alt="Team tailwind section"
							class="mx-auto h-56 w-44 rounded-2xl object-cover min-[450px]:mr-0 md:mt-20"
						/>
						<img
							src="https://pagedone.io/asset/uploads/1696238665.png"
							alt="Team tailwind section"
							class="mx-auto h-56 w-44 rounded-2xl object-cover min-[450px]:ml-0 md:mx-auto"
						/>
						<img
							src="https://pagedone.io/asset/uploads/1696238684.png"
							alt="Team tailwind section"
							class="mx-auto h-56 w-44 rounded-2xl object-cover min-[450px]:mr-0 md:mt-20 md:ml-0"
						/>
						<img
							src="https://pagedone.io/asset/uploads/1696238702.png"
							alt="Team tailwind section"
							class="mx-auto h-56 w-44 rounded-2xl object-cover min-[450px]:ml-0 md:mr-0 md:ml-auto"
						/>
						<img
							src="https://pagedone.io/asset/uploads/1696238720.png"
							alt="Team tailwind section"
							class="mx-auto h-56 w-44 rounded-2xl object-cover min-[450px]:mr-0 md:mx-auto md:-mt-20"
						/>
						<img
							src="https://pagedone.io/asset/uploads/1696238737.png"
							alt="Team tailwind section"
							class="mx-auto h-56 w-44 rounded-2xl object-cover min-[450px]:ml-0 md:mr-0"
						/>
					</div>
				</div>
			</div>
		</div>
	</section>
</Container>
