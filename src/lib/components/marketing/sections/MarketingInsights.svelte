<script>
	import Container from '@/lib/components/Container.svelte';
</script>

<Container>
	<div class="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
		<div class="mx-auto mb-10 max-w-2xl text-center lg:mb-14">
			<h2>Insights</h2>
			<p class="mt-4">Stay in the know with insights from industry experts.</p>
		</div>

		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			<a class="group flex flex-col focus:outline-hidden" href="/#">
				<div class="relative overflow-hidden rounded-xl pt-[50%] sm:pt-[70%]">
					<img
						class="absolute start-0 top-0 size-full rounded-xl object-cover transition-transform duration-500 ease-in-out group-hover:scale-105 group-focus:scale-105"
						src="https://images.unsplash.com/photo-1586232702178-f044c5f4d4b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80"
						alt="Blog"
					/>
					<span
						class="absolute end-0 top-0 rounded-se-xl rounded-es-xl bg-gray-800 px-3 py-1.5 text-xs font-medium text-white dark:bg-neutral-900"
					>
						Sponsored
					</span>
				</div>

				<div class="mt-7">
					<h3 class="group-hover:text-muted-foreground text-xl font-semibold">Studio by Preline</h3>
					<p class="mt-3">
						Produce professional, reliable streams easily leveraging Preline's innovative broadcast
						studio
					</p>
					<p
						class="text-primary mt-5 inline-flex items-center gap-x-1 text-sm font-medium decoration-2 group-hover:underline group-focus:underline dark:text-blue-500"
					>
						Read more
						<svg
							class="size-4 shrink-0"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg
						>
					</p>
				</div>
			</a>

			<a class="group flex flex-col focus:outline-hidden" href="/#">
				<div class="relative overflow-hidden rounded-xl pt-[50%] sm:pt-[70%]">
					<img
						class="absolute start-0 top-0 size-full rounded-xl object-cover transition-transform duration-500 ease-in-out group-hover:scale-105 group-focus:scale-105"
						src="https://images.unsplash.com/photo-1542125387-c71274d94f0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80"
						alt="Blog"
					/>
				</div>

				<div class="mt-7">
					<h3 class="group-hover:text-muted-foreground text-xl font-semibold">Onsite</h3>
					<p class="mt-3">
						Optimize your in-person experience with best-in-class capabilities like badge printing
						and lead retrieval
					</p>
					<p
						class="text-primary mt-5 inline-flex items-center gap-x-1 text-sm font-medium decoration-2 group-hover:underline group-focus:underline dark:text-blue-500"
					>
						Read more
						<svg
							class="size-4 shrink-0"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg
						>
					</p>
				</div>
			</a>

			<a
				class="group relative flex min-h-60 w-full flex-col rounded-xl bg-[url('https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80')] bg-cover bg-center transition hover:shadow-lg focus:shadow-lg focus:outline-hidden"
				href="/#"
			>
				<div class="flex-auto p-4 md:p-6">
					<h3 class="text-xl text-white/90 group-hover:text-white">
						<span class="font-bold">Preline</span> Press publishes books about economic and technological
						advancement.
					</h3>
				</div>
				<div class="p-4 pt-0 md:p-6">
					<div
						class="inline-flex items-center gap-2 text-sm font-medium text-white group-hover:text-white/70 group-focus:text-white/70"
					>
						Visit the site
						<svg
							class="size-4 shrink-0"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg
						>
					</div>
				</div>
			</a>
		</div>
	</div>
</Container>
