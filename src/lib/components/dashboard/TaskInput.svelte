<script lang="ts">
	import { Button } from '@/lib/components/ui/button';
	import { Input } from '@/lib/components/ui/input/index';
	import { api } from '@/convex/_generated/api';
	import { useConvexClient } from 'convex-svelte';
	import { toasts } from '@/lib/utils/toasts';

	let taskBody = $state('');
	let mutationLoading = $state(false);
	const client = useConvexClient();

	const { user_id } = $props<{ user_id: string }>();

	const createTask = async () => {
		try {
			mutationLoading = true;
			await client.mutation(api.tasks.create, { body: taskBody, user_id });
			toasts.taskCreated(taskBody);
			taskBody = '';
			mutationLoading = false;
		} catch (error) {
			toasts.error('Something went wrong creating your task');
		}
	};
</script>

<div class="mb-6 grid gap-4">
	<Input type="text" placeholder="Enter task..." class="max-w-xs" bind:value={taskBody} />
	<Button onclick={createTask} disabled={taskBody.length < 1 || mutationLoading}>Create Task</Button
	>
</div>
