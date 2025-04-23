<script lang="ts" module>
	import type { UserResource } from '@clerk/types';
	import { data } from '@/lib/components/sidebar/sampleData';
</script>

<script lang="ts">
	import NavMain from '@/lib/components/sidebar/NavMain.svelte';
	import NavProjects from '@/lib/components/sidebar/NavProjects.svelte';
	import NavUser from '@/lib/components/sidebar/NavUser.svelte';
	import TeamSwitcher from '@/lib/components/sidebar/TeamSwitcher.svelte';
	import * as Sidebar from '@/lib/components/ui/sidebar/index.js';
	import type { ComponentProps } from 'svelte';

	let {
		ref = $bindable(null),
		collapsible = 'icon',
		user,
		...restProps
	}: ComponentProps<typeof Sidebar.Root> & {
		user?: UserResource;
	} = $props();

	const userData = $derived({
		name: user?.firstName ?? 'User',
		email: user?.emailAddresses[0]?.emailAddress ?? '',
		avatar: user?.imageUrl ?? ''
	});
</script>

<Sidebar.Root bind:ref {collapsible} {...restProps}>
	<Sidebar.Header>
		<TeamSwitcher teams={data.teams} />
	</Sidebar.Header>
	<Sidebar.Content>
		<NavMain items={data.navMain} />
		<NavProjects projects={data.projects} />
	</Sidebar.Content>
	<Sidebar.Footer>
		<NavUser user={userData} />
	</Sidebar.Footer>
	<Sidebar.Rail />
</Sidebar.Root>
