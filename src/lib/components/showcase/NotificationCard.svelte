<script lang="ts">
	import { Button } from '@/lib/components/ui/button';
	import * as Card from '@/lib/components/ui/card/index';
	import { Switch } from '@/lib/components/ui/switch';
	import { Bell, Check } from '@lucide/svelte';

	const notifications = [
		{
			title: 'Your call has been confirmed.',
			description: '1 hour ago'
		},
		{
			title: 'You have a new message!',
			description: '1 hour ago'
		},
		{
			title: 'Your subscription is expiring soon!',
			description: '2 hours ago'
		}
	];
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Notifications</Card.Title>
		<Card.Description>You have 3 unread messages.</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class=" mb-4 flex items-center space-x-4 rounded-md border p-4">
			<Bell />
			<div class="flex-1 space-y-1">
				<p class="text-sm leading-none font-medium">Push Notifications</p>
				<p class="text-muted-foreground text-sm">Send notifications to device.</p>
			</div>
			<Switch />
		</div>
		<div>
			{#each notifications as notification, index (index)}
				<div class="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
					<span class="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500"></span>
					<div class="space-y-1">
						<p class="text-sm leading-none font-medium">
							{notification.title}
						</p>
						<p class="text-muted-foreground text-sm">
							{notification.description}
						</p>
					</div>
				</div>
			{/each}
		</div>
	</Card.Content>
	<Card.Footer>
		<Button class="w-full">
			<Check class="mr-2 h-4 w-4" /> Mark all as read
		</Button>
	</Card.Footer>
</Card.Root>
