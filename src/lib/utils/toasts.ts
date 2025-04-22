import { toast } from 'svelte-sonner';
import type { ConvexClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';
import type { Doc } from '@/convex/_generated/dataModel';

export const toasts = {
	error: (errorMessage: string) =>
		toast('Error', {
			description: errorMessage
		}),
	taskCreated: (text: string) =>
		toast('Task Created! 🎉', {
			description: `Body: ${text}`
		}),
	taskDeleted: (client: ConvexClient, task: Doc<'tasks'>, user_id: string) =>
		toast('Task deleted', {
			action: {
				label: 'Undo',
				onClick: () => {
					client.mutation(api.tasks.restore, {
						task: {
							taskBody: task.taskBody,
							isCompleted: task.isCompleted,
							user_id
						}
					});
				}
			}
		})
};
