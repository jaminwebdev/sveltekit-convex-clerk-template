<script lang="ts">
	import { SignedIn, UserButton } from 'svelte-clerk/client';
	import ThemeToggle from '@/lib/components/ThemeToggle.svelte';
	import { Boxes } from '@lucide/svelte';
	import * as Sheet from '@/lib/components/ui/sheet/index.js';
	import { buttonVariants, Button } from '@/lib/components/ui/button/index.js';
	import { Menu } from 'lucide-svelte';
</script>

<div class="border-b-primary/50 border-1">
	<header class=" flex justify-between p-5">
		<a href="/" class="flex items-center gap-1">
			<Boxes size="32" />
			<span class="text-2xl font-black">Site Logo</span>
		</a>

		<div class="flex items-center gap-4">
			<Sheet.Root>
				<Sheet.Trigger class={buttonVariants({ variant: 'outline' })}>
					<Menu />
				</Sheet.Trigger>
				<Sheet.Content side="right">
					<Sheet.Header>
						<Sheet.Title>
							<a href="/" class="mt-8 flex items-center justify-center gap-1">
								<Boxes size="32" />
								<span class="text-2xl font-black">Site Logo</span>
							</a>
						</Sheet.Title>
					</Sheet.Header>
					<div class="grid gap-4 py-12">
						<nav class="flex flex-col items-center gap-6">
							<a href="/dashboard" class="text-lg font-semibold">Dashboard</a>
							<a href="/#" class="text-lg font-semibold">Collections</a>
							<a href="/#" class="text-lg font-semibold">Sale</a>
							<a href="/#" class="text-lg font-semibold">About</a>
							<ThemeToggle />
						</nav>
					</div>
				</Sheet.Content>
			</Sheet.Root>
			<SignedIn>
				<UserButton />
			</SignedIn>
		</div>
	</header>
</div>
