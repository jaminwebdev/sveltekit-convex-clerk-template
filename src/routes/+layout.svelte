<script lang="ts">
	import '../app.css';
	import { type Snippet } from 'svelte';
	import { ClerkProvider } from 'svelte-clerk';
	import { Toaster } from '@/lib/components/ui/sonner/index.js';
	import { PUBLIC_CLERK_PUBLISHABLE_KEY } from '$env/static/public';
	import { useTheme } from '@/stores/ThemeStove.svelte';
	import { setThemeContext } from '@/contexts/ThemeContext';

	setThemeContext(useTheme);

	const { children }: { children: Snippet } = $props();
</script>

<ClerkProvider publishableKey={PUBLIC_CLERK_PUBLISHABLE_KEY}>
	{@render children()}
	<Toaster />
</ClerkProvider>
