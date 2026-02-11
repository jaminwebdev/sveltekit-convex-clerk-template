import type { QueryCtx, MutationCtx } from './_generated/server';
import { query, mutation } from './_generated/server';
import { v } from 'convex/values';

// New helper function for authentication check
const getAuthenticatedClerkId = async (ctx: QueryCtx | MutationCtx): Promise<string> => {
	const identity = await ctx.auth.getUserIdentity();
	if (identity === null) {
		throw new Error('Not authenticated');
	}
	return identity.tokenIdentifier.split('|')[1];
};

export const get = query({
	args: {},
	handler: async (ctx) => {
		const clerkUserId = await getAuthenticatedClerkId(ctx);
		return await ctx.db
			.query('tasks')
			.withIndex('by_user_id', (q) => q.eq('user_id', clerkUserId))
			.collect();
	}
});

export const create = mutation({
	args: { body: v.string() },
	handler: async (ctx, args) => {
		const clerkUserId = await getAuthenticatedClerkId(ctx);
		const { body } = args;
		await ctx.db.insert('tasks', {
			taskBody: body,
			isCompleted: false,
			user_id: clerkUserId
		});
	}
});

export const update = mutation({
	args: { id: v.id('tasks'), isCompleted: v.boolean() },
	handler: async (ctx, args) => {
		const { id, isCompleted } = args;
		const clerkUserId = await getAuthenticatedClerkId(ctx);

		const task = await ctx.db.get(id);
		if (task === null || task.user_id !== clerkUserId) {
			throw new Error('Not authorized to update this task');
		}
		await ctx.db.patch(id, { isCompleted });
	}
});

export const remove = mutation({
	args: { id: v.id('tasks') },
	handler: async (ctx, args) => {
		const { id } = args;
		const clerkUserId = await getAuthenticatedClerkId(ctx);

		const task = await ctx.db.get(id);
		if (task === null || task.user_id !== clerkUserId) {
			throw new Error('Not authorized to delete this task');
		}
		await ctx.db.delete(id);
	}
});

export const restore = mutation({
	args: { task: v.object({ taskBody: v.string(), isCompleted: v.boolean() }) },
	handler: async (ctx, args) => {
		const { task } = args;
		const clerkUserId = await getAuthenticatedClerkId(ctx);
		await ctx.db.insert('tasks', { ...task, user_id: clerkUserId });
	}
});
