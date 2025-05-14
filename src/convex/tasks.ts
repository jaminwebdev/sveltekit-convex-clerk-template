import { query, mutation } from './_generated/server';
import { v } from 'convex/values';
import type { DatabaseReader } from './_generated/server';
import type { Id } from './_generated/dataModel';

async function authorizeTaskAccess(
	ctx: { db: DatabaseReader },
	taskId: Id<'tasks'>,
	userId: string
) {
	const task = await ctx.db.get(taskId);
	if (!task) throw new Error('Task not found');
	if (task.user_id !== userId) throw new Error('Not authorized to access this task');
	return task;
}

export const get = query({
	args: { user_id: v.string() },
	handler: async (ctx, args) => {
		return await ctx.db
			.query('tasks')
			.withIndex('by_user_id', (q) => q.eq('user_id', args.user_id))
			.collect();
	}
});

export const create = mutation({
	args: { body: v.string(), user_id: v.string() },
	handler: async (ctx, args) => {
		const { body, user_id } = args;
		await ctx.db.insert('tasks', { taskBody: body, isCompleted: false, user_id });
	}
});

export const update = mutation({
	args: { id: v.id('tasks'), isCompleted: v.boolean(), user_id: v.string() },
	handler: async (ctx, args) => {
		const { id, isCompleted, user_id } = args;
		await authorizeTaskAccess(ctx, id, user_id);
		await ctx.db.patch(id, { isCompleted });
	}
});

export const remove = mutation({
	args: { id: v.id('tasks'), user_id: v.string() },
	handler: async (ctx, args) => {
		const { id, user_id } = args;
		await authorizeTaskAccess(ctx, id, user_id);
		await ctx.db.delete(id);
	}
});

export const restore = mutation({
	args: { task: v.object({ taskBody: v.string(), isCompleted: v.boolean(), user_id: v.string() }) },
	handler: async (ctx, args) => {
		const { task } = args;
		await ctx.db.insert('tasks', task);
	}
});
