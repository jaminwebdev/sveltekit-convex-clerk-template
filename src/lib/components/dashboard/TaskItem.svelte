<script lang="ts">
	import { Button } from '@/lib/components/ui/button';
	import { Checkbox } from '@/lib/components/ui/checkbox/index.js';
	import { Label } from '@/lib/components/ui/label/index.js';
	import { CircleX } from '@lucide/svelte';
	import { api } from '@/convex/_generated/api';
	import { useConvexClient } from 'convex-svelte';
	import { cn } from '@/lib/utils';
	import type { Doc } from '@/convex/_generated/dataModel';
	import { toasts } from '@/lib/utils/toasts';

	const client = useConvexClient();

	const { task } = $props<{
		task: Doc<'tasks'>;
	}>();

	const updateTask = () =>
		client.mutation(api.tasks.update, { id: task._id, isCompleted: !task.isCompleted });

	const removeTask = async () => {
		try {
			await client.mutation(api.tasks.remove, { id: task._id });
			toasts.taskDeleted(client, task);
		} catch (error) {
			toasts.error(
				error instanceof Error ? error.message : 'Something went wrong deleting your task'
			);
		}
	};
</script>

<li class="flex justify-between">
	<Label for={task._id} class="flex cursor-pointer items-center gap-2 text-sm font-bold">
		<Checkbox
			id={task._id}
			checked={task.isCompleted}
			onCheckedChange={updateTask}
			aria-labelledby="terms-label"
		/>
		<span class={cn(task.isCompleted ? 'line-through' : '')}>{task.taskBody}</span>
	</Label>
	<Button variant="ghost" onclick={removeTask}>
		<CircleX />
	</Button>
</li>
