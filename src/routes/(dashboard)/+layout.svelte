<script lang="ts">
	import Redirect from '@/lib/components/Redirect.svelte';
	import { SignedOut, SignedIn } from 'svelte-clerk/client';
	import { PUBLIC_CONVEX_URL } from '$env/static/public';
	import { setupConvex } from 'convex-svelte';

	const { children } = $props();
	setupConvex(PUBLIC_CONVEX_URL);
</script>

<SignedIn>
	{@render children()}
</SignedIn>
<SignedOut>
	<Redirect route="login" />
</SignedOut>
