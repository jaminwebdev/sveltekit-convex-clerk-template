<script lang="ts" module>
	import AudioWaveform from '@lucide/svelte/icons/audio-waveform';
	import BookOpen from '@lucide/svelte/icons/book-open';
	import Bot from '@lucide/svelte/icons/bot';
	import ChartPie from '@lucide/svelte/icons/chart-pie';
	import Command from '@lucide/svelte/icons/command';
	import Frame from '@lucide/svelte/icons/frame';
	import GalleryVerticalEnd from '@lucide/svelte/icons/gallery-vertical-end';
	import Map from '@lucide/svelte/icons/map';
	import Settings2 from '@lucide/svelte/icons/settings-2';
	import SquareTerminal from '@lucide/svelte/icons/square-terminal';
	import { useClerkContext } from 'svelte-clerk/client';
	import type { UserResource } from '@clerk/types';

	// This is sample data.
	const data = {
		user: {
			name: 'shadcn',
			email: 'm@example.com',
			avatar: ''
		},
		teams: [
			{
				name: 'Acme Inc',
				logo: GalleryVerticalEnd,
				plan: 'Enterprise'
			},
			{
				name: 'Acme Corp.',
				logo: AudioWaveform,
				plan: 'Startup'
			},
			{
				name: 'Evil Corp.',
				logo: Command,
				plan: 'Free'
			}
		],
		navMain: [
			{
				title: 'Playground',
				url: '#',
				icon: SquareTerminal,
				isActive: true,
				items: [
					{
						title: 'History',
						url: '#'
					},
					{
						title: 'Starred',
						url: '#'
					},
					{
						title: 'Settings',
						url: '#'
					}
				]
			},
			{
				title: 'Models',
				url: '#',
				icon: Bot,
				items: [
					{
						title: 'Genesis',
						url: '#'
					},
					{
						title: 'Explorer',
						url: '#'
					},
					{
						title: 'Quantum',
						url: '#'
					}
				]
			},
			{
				title: 'Documentation',
				url: '#',
				icon: BookOpen,
				items: [
					{
						title: 'Introduction',
						url: '#'
					},
					{
						title: 'Get Started',
						url: '#'
					},
					{
						title: 'Tutorials',
						url: '#'
					},
					{
						title: 'Changelog',
						url: '#'
					}
				]
			},
			{
				title: 'Settings',
				url: '#',
				icon: Settings2,
				items: [
					{
						title: 'General',
						url: '#'
					},
					{
						title: 'Team',
						url: '#'
					},
					{
						title: 'Billing',
						url: '#'
					},
					{
						title: 'Limits',
						url: '#'
					}
				]
			}
		],
		projects: [
			{
				name: 'Design Engineering',
				url: '#',
				icon: Frame
			},
			{
				name: 'Sales & Marketing',
				url: '#',
				icon: ChartPie
			},
			{
				name: 'Travel',
				url: '#',
				icon: Map
			}
		]
	};
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
