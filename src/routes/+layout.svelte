<script lang="ts">
	import '../app.css';
	import { setContext, type Snippet } from 'svelte';
	import { ClerkProvider } from 'svelte-clerk';
	import Footer from '@/lib/components/Footer.svelte';
	import { Toaster } from '@/lib/components/ui/sonner/index.js';
	import { PUBLIC_CLERK_PUBLISHABLE_KEY } from '$env/static/public';
	import { useTheme } from '@/stores/ThemeStove.svelte';

	setContext('theme', useTheme());

	const { children }: { children: Snippet } = $props();
</script>

<ClerkProvider publishableKey={PUBLIC_CLERK_PUBLISHABLE_KEY}>
	{@render children()}
	<Footer />
	<Toaster />
</ClerkProvider>
