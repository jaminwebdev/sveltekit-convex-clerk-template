<script lang="ts">
	import Redirect from '@/lib/components/Redirect.svelte';
	import { SignedIn, SignedOut, SignIn } from 'svelte-clerk/client';
</script>

<SignedOut>
	<div class="flex items-center justify-center py-10">
		<SignIn redirectUrl="/dashboard" />
	</div>
</SignedOut>
<SignedIn>
	<Redirect route="dashboard" />
</SignedIn>
