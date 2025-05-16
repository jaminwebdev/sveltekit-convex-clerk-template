<script lang="ts">
	import Container from '@/lib/components/Container.svelte';
	import ButtonsExample from '@/lib/components/dashboard/ButtonsExample.svelte';
	import ThemeCard from '@/lib/components/dashboard/ThemeCard.svelte';
	import NotificationCard from '@/lib/components/dashboard/NotificationCard.svelte';
	import AccountCard from '@/lib/components/dashboard/AccountCard.svelte';
	import TaskCard from '@/lib/components/dashboard/TaskCard.svelte';
</script>

<main class="grid gap-6 py-10">
	<Container classes="grid grid-cols-1 md:grid-cols-3 gap-6">
		<ThemeCard />
		<TaskCard />
		<NotificationCard />
	</Container>
	<div class="flex justify-center">
		<ButtonsExample />
	</div>
	<Container classes="grid grid-cols-1 md:grid-cols-3 gap-6">
		<AccountCard />
	</Container>
</main>
