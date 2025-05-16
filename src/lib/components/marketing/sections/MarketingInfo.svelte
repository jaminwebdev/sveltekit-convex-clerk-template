<script>
	import { ChevronRight } from 'lucide-svelte';
	import PillSubheading from '../../PillSubheading.svelte';
	import Button from '../../ui/button/button.svelte';
</script>

<section class="relative mr-0 py-24 lg:mr-5 xl:mr-0">
	<div class="mx-auto w-full max-w-7xl px-4 md:px-5 lg:px-5">
		<div class="grid w-full grid-cols-1 items-center justify-start gap-10 lg:grid-cols-2 xl:gap-20">
			<div class="flex w-full items-start justify-center lg:justify-start">
				<img
					class="h-full w-full rounded-3xl object-cover"
					src="https://pagedone.io/asset/uploads/1717742431.png"
					alt="about Us"
				/>
			</div>
			<div class="inline-flex w-full flex-col items-center justify-center gap-10 lg:items-start">
				<div class="flex w-full flex-col items-start justify-center gap-8">
					<div class="flex flex-col items-center justify-start gap-4 lg:items-start">
						<PillSubheading>About Us</PillSubheading>
						<div class="flex w-full flex-col items-center justify-start gap-6 lg:items-start">
							<h2>The Tale of Our Achievement Story</h2>
							<p>
								Our achievement story is a testament to teamwork and perseverance. Together, we've
								overcome challenges, celebrated victories, and created a narrative of progress and
								success.
							</p>
						</div>
					</div>
					<div class="flex w-full flex-col items-start justify-center gap-6">
						<div class="grid w-full grid-cols-1 items-center justify-start gap-8 md:grid-cols-2">
							<div
								class="inline-flex h-full w-full flex-col items-start justify-start gap-2.5 rounded-xl border border-gray-200 p-3.5 transition-all duration-700 ease-in-out hover:border-gray-400"
							>
								<h4 class="font-manrope text-2xl leading-9 font-bold">33+ Years</h4>
								<p class="text-muted-foreground text-base leading-relaxed font-normal">
									Influencing Digital Landscapes Together
								</p>
							</div>
							<div
								class="inline-flex h-full w-full flex-col items-start justify-start gap-2.5 rounded-xl border border-gray-200 p-3.5 transition-all duration-700 ease-in-out hover:border-gray-400"
							>
								<h4 class="font-manrope text-2xl leading-9 font-bold">125+ Projects</h4>
								<p class="text-muted-foreground text-base leading-relaxed font-normal">
									Excellence Achieved Through Success
								</p>
							</div>
						</div>
						<div
							class="grid h-full w-full grid-cols-1 items-center justify-start gap-8 md:grid-cols-2"
						>
							<div
								class="inline-flex w-full flex-col items-start justify-start gap-2.5 rounded-xl border border-gray-200 p-3.5 transition-all duration-700 ease-in-out hover:border-gray-400"
							>
								<h4 class="font-manrope text-2xl leading-9 font-bold">26+ Awards</h4>
								<p class="text-muted-foreground text-base leading-relaxed font-normal">
									Our Dedication to Innovation Wins Understanding
								</p>
							</div>
							<div
								class="inline-flex h-full w-full flex-col items-start justify-start gap-2.5 rounded-xl border border-gray-200 p-3.5 transition-all duration-700 ease-in-out hover:border-gray-400"
							>
								<h4 class="font-manrope text-2xl leading-9 font-bold">99% Happy Clients</h4>
								<p class="text-muted-foreground text-base leading-relaxed font-normal">
									Mirrors our Focus on Client Satisfaction.
								</p>
							</div>
						</div>
					</div>
				</div>
				<Button>
					Read More
					<ChevronRight />
				</Button>
			</div>
		</div>
	</div>
</section>
