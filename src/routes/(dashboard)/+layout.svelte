<script lang="ts">
	import Redirect from '@/lib/components/Redirect.svelte';
	import { SignedOut, SignedIn } from 'svelte-clerk/client';
	const { children } = $props();
</script>

<SignedIn>
	{@render children()}
</SignedIn>
<SignedOut>
	<Redirect route="login" />
</SignedOut>
