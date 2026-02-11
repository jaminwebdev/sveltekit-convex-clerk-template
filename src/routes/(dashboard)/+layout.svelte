<script lang="ts">
	import { PUBLIC_CONVEX_URL } from '$env/static/public';
	import { setupConvex, useConvexClient } from 'convex-svelte';
	import * as Sidebar from '@/lib/components/ui/sidebar/index.js';
	import AppSidebar from '@/lib/components/sidebar/AppSidebar.svelte';
	import { useClerkContext } from 'svelte-clerk/client';

	const { children } = $props();

	const clerkCtx = useClerkContext();
	const user = $derived(clerkCtx.user);

	setupConvex(PUBLIC_CONVEX_URL, { expectAuth: true });
	const convexClient = useConvexClient();

	const clerkIsLoaded = $derived(clerkCtx.isLoaded);

	const tokenFetcher = async () => {
		if (clerkCtx.session) {
			return await clerkCtx.session.getToken({ template: 'convex' });
		}
		return null;
	};

	$effect(() => {
		if (clerkIsLoaded) {
			convexClient.setAuth(tokenFetcher);
		}
	});
</script>

{#if !clerkIsLoaded}
	<div class="flex h-screen w-full items-center justify-center text-lg text-gray-500">
		Loading authentication...
	</div>
{:else}
	<Sidebar.Provider>
		<AppSidebar user={user ?? undefined} />
		<Sidebar.Inset>
			<header
				class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"
			>
				<div class="flex items-center gap-2 px-4">
					<Sidebar.Trigger class="-ml-1" />
				</div>
			</header>
			{@render children()}
		</Sidebar.Inset>
	</Sidebar.Provider>
{/if}
