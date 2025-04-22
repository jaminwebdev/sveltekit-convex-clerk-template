<script lang="ts">
	import Container from '@/lib/components/Container.svelte';
	import ButtonsExample from '@/lib/components/showcase/ButtonsExample.svelte';
	import ThemeCard from '@/lib/components/showcase/ThemeCard.svelte';
	import NotificationCard from '@/lib/components/showcase/NotificationCard.svelte';
	import AccountCard from '@/lib/components/showcase/AccountCard.svelte';
	import TaskCard from '@/lib/components/showcase/TaskCard.svelte';
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
