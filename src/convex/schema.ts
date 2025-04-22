import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema(
	{
		tasks: defineTable({
			taskBody: v.string(),
			isCompleted: v.boolean(),
			user_id: v.string()
		})
	},
	{
		schemaValidation: true
	}
);
