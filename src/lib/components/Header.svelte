<script lang="ts">
	import { SignedIn, SignedOut, UserButton } from 'svelte-clerk/client';
	import ThemeToggle from '@/lib/components/ThemeToggle.svelte';
	import { Boxes } from '@lucide/svelte';
	import Container from './Container.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { LayoutDashboard } from 'lucide-svelte';
</script>

<div class="border-b-primary/50 border-1">
	<Container classes="max-w-[88rem]">
		<header class=" flex justify-between p-5">
			<a href="/" class="flex items-center gap-1">
				<Boxes size="32" />
				<span class="text-2xl font-black">Site Logo</span>
			</a>
			<div class="flex items-center gap-4">
				<ThemeToggle />
				<Button href="/dashboard" size="icon" variant="outline">
					<LayoutDashboard />
				</Button>
				<SignedIn>
					<UserButton />
				</SignedIn>
			</div>
		</header>
	</Container>
</div>
