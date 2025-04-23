<script lang="ts">
	import '../app.css';
	import type { Snippet } from 'svelte';
	import { ClerkProvider } from 'svelte-clerk';
	import Footer from '@/lib/components/Footer.svelte';
	import { Toaster } from '@/lib/components/ui/sonner/index.js';
	import { PUBLIC_CLERK_PUBLISHABLE_KEY } from '$env/static/public';

	const { children }: { children: Snippet } = $props();
</script>

<ClerkProvider publishableKey={PUBLIC_CLERK_PUBLISHABLE_KEY}>
	{@render children()}
	<Footer />
	<Toaster />
</ClerkProvider>
