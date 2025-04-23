<script lang="ts">
	import '../app.css';
	import type { Snippet } from 'svelte';
	import { ClerkProvider } from 'svelte-clerk';
	import Footer from '@/lib/components/Footer.svelte';
	import { Toaster } from '@/lib/components/ui/sonner/index.js';

	const { children }: { children: Snippet } = $props();
</script>

<ClerkProvider>
	{@render children()}
	<Footer />
	<Toaster />
</ClerkProvider>
