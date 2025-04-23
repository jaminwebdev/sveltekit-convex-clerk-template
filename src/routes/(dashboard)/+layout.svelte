<script lang="ts">
	import Redirect from '@/lib/components/Redirect.svelte';
	import { SignedOut, SignedIn } from 'svelte-clerk/client';
	import { PUBLIC_CONVEX_URL } from '$env/static/public';
	import { setupConvex } from 'convex-svelte';
	import * as Sidebar from '@/lib/components/ui/sidebar/index.js';
	import AppSidebar from '@/lib/components/sidebar/AppSidebar.svelte';
	import { useClerkContext } from 'svelte-clerk/client';

	const { children } = $props();
	setupConvex(PUBLIC_CONVEX_URL);
	const ctx = useClerkContext();
	const user = $derived(ctx.user);
</script>

<SignedIn>
	<Sidebar.Provider>
		<AppSidebar user={user ?? undefined} />
		<Sidebar.Inset>
			<header
				class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
			>
				<div class="flex items-center gap-2 px-4">
					<Sidebar.Trigger class="-ml-1" />
				</div>
			</header>
			{@render children()}
		</Sidebar.Inset>
	</Sidebar.Provider>
</SignedIn>
<SignedOut>
	<Redirect route="login" />
</SignedOut>
