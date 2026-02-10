<script lang="ts">
	import { SignedIn, UserButton } from 'svelte-clerk/client';
	import ThemeToggle from '@/lib/components/ThemeToggle.svelte';
	import Container from '@/lib/components/Container.svelte';
	import { Button } from '@/lib/components/ui/button';
	import { LayoutDashboard } from 'lucide-svelte';
	import SiteLogo from '@/lib/components/SiteLogo.svelte';
</script>

<div class="border-b-primary/50 border">
	<Container classes="max-w-[88rem]">
		<header class=" flex justify-between p-5">
			<SiteLogo />
			<nav class="hidden gap-12 lg:flex 2xl:ml-16">
				<a href="/#" class="hover:text-primary text-lg font-semibold transition duration-100"
					>Collections</a
				>
				<a href="/#" class="hover:text-primary text-lg font-semibold transition duration-100"
					>Sale</a
				>
				<a href="/#" class="hover:text-primary text-lg font-semibold transition duration-100"
					>About</a
				>
			</nav>
			<div class="flex items-center gap-4">
				<ThemeToggle />
				<Button href="/dashboard" variant="outline">
					Dashboard
					<LayoutDashboard />
				</Button>
				<SignedIn>
					<UserButton />
				</SignedIn>
			</div>
		</header>
	</Container>
</div>
