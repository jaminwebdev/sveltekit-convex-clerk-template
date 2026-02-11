<script lang="ts">
	import * as Card from '@/lib/components/ui/card/index';
	import TaskInput from '@/lib/components/dashboard/TaskInput.svelte';
	import TaskList from '@/lib/components/dashboard/TaskList.svelte';
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Tasks</Card.Title>
		<Card.Description>Manage your tasklist</Card.Description>
	</Card.Header>
	<Card.Content>
		<TaskInput />
		<TaskList />
	</Card.Content>
</Card.Root>
