import { icons } from '@/lib/utils/icons';
// This is sample data.
export const data = {
	user: {
		name: 'shadcn',
		email: 'm@example.com',
		avatar: ''
	},
	teams: [
		{
			name: 'Acme Inc',
			logo: icons.GalleryVerticalEnd,
			plan: 'Enterprise'
		},
		{
			name: 'Acme Corp.',
			logo: icons.AudioWaveform,
			plan: 'Startup'
		},
		{
			name: 'Evil Corp.',
			logo: icons.Command,
			plan: 'Free'
		}
	],
	navMain: [
		{
			title: 'Playground',
			url: '#',
			icon: icons.SquareTerminal,
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
			icon: icons.Bot,
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
			icon: icons.BookOpen,
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
			icon: icons.Settings2,
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
			icon: icons.Frame
		},
		{
			name: 'Sales & Marketing',
			url: '#',
			icon: icons.ChartPie
		},
		{
			name: 'Travel',
			url: '#',
			icon: Map
		}
	]
};
