# SvelteKit and Convex Integration Pattern

This document outlines the specific architectural pattern used in this project to integrate the SvelteKit frontend with the Convex backend. The pattern ensures that data access is secure and efficient.

In this project we use Svelte and the convex-svelte package together. 

Here's the documentation/github repo for this package: https://github.com/get-convex/convex-svelte

## Overview

The core of the pattern is a **client-driven authorization model**. The SvelteKit client is responsible for obtaining the current user's identity (whether that be through a +page.server.ts/+layout.server.ts loader or a front-end auth client) and passing the `user_id` to Convex queries and mutations. The Convex backend then uses this `user_id` to both filter data and, crucially, to authorize access to specific documents.

This creates a clear separation of concerns:
- **SvelteKit (Client):** Manages UI, user authentication state, and calls Convex functions with the necessary user context.
- **Convex (Backend):** Defines data schema, business logic, and enforces strict data access rules based on the user identity provided by the client.

## Key Components of the Pattern

### 1. Client-Side User Identity

- The user's ID is obtained on the client through PageData or a client-auth library (in the examples below, it happens to be Clerk).
- This `user_id` is then passed as a prop to any components that need to interact with user-specific data.

*Example (`TaskCard.svelte`):*
```svelte
<script lang="ts">
	import { useClerkContext } from 'svelte-clerk/client';
	// ...
	const ctx = useClerkContext();
	const user_id = $derived(ctx.auth.userId as string);
</script>

<!-- user_id is passed down to child components -->
<TaskInput {user_id} />
<TaskList {user_id} />
```

### 2. Fetching Data (Queries)

- The `convex-svelte` package's `useQuery` hook is used to subscribe to Convex queries.
- The `user_id` is passed as an argument to the query, which the backend uses to fetch only the relevant data.

*Example (`TaskList.svelte`):*
```svelte
<script lang="ts">
	import { useQuery } from 'convex-svelte';
	import { api } from '@/convex/_generated/api';
	// ...
	const { user_id } = $props<{ user_id: string }>();
	const query = $derived(useQuery(api.tasks.get, { user_id }));
</script>

<!-- UI reacts to query state (isLoading, error, data) -->
```

### 3. Modifying Data (Mutations)

- The `useConvexClient` hook provides a raw client instance.
- Mutations are called using `client.mutation()`, passing the `user_id` along with other arguments.

*Example (`TaskInput.svelte`):*
```svelte
<script lang="ts">
	import { useConvexClient } from 'convex-svelte';
	import { api } from '@/convex/_generated/api';
	// ...
	const client = useConvexClient();
	const { user_id } = $props<{ user_id: string }>();

	const createTask = async () => {
		// ...
		await client.mutation(api.tasks.create, { body: taskBody, user_id });
		// ...
	};
</script>
```

### 4. Backend Authorization

This is the most critical piece of the pattern for ensuring security.

- **For Queries:** The backend uses the `user_id` to filter results using a database index. This is efficient and ensures users only see their own data.

*Example (`tasks.ts` - `get` query):*
```typescript
export const get = query({
	args: { user_id: v.string() },
	handler: async (ctx, args) => {
		return await ctx.db
			.query('tasks')
			.withIndex('by_user_id', (q) => q.eq('user_id', args.user_id))
			.collect();
	}
});
```

- **For Mutations/Actions:** For any operation that modifies or deletes a *specific* document, a dedicated authorization helper (`authorizeTaskAccess`) is used. This function retrieves the document and verifies that the `user_id` from the client matches the `user_id` stored on the document. If they don't match, it throws an error, preventing the operation from proceeding.

*Example (`tasks.ts` - `authorizeTaskAccess` and `update` mutation):*
```typescript
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

export const update = mutation({
	args: { id: v.id('tasks'), isCompleted: v.boolean(), user_id: v.string() },
	handler: async (ctx, args) => {
		const { id, isCompleted, user_id } = args;
		await authorizeTaskAccess(ctx, id, user_id); // Authorization check
		await ctx.db.patch(id, { isCompleted });
	}
});
```

## Summary

This pattern provides a robust and scalable way to build secure applications with SvelteKit and Convex. By passing the user identity from the client and verifying it on the backend for every relevant operation, we ensure that users can only access and modify their own data.

## Alternative Authentication Patterns

While these examples use Clerk for authentication, it's worth noting that Convex provides its own built-in authentication solutions that may be more streamlined for certain use cases.

### Convex Auth (Beta)

Convex offers its own native solution, [Convex Auth](https://docs.convex.dev/auth/convex-auth), which is currently in beta. It simplifies adding authentication and offers a significant advantage over the client-driven pattern described in this document.

- **Primary Benefit:** With Convex Auth, the user's authentication information is automatically available in the backend context (`ctx`) of any query or mutation. This eliminates the need to manually pass the `user_id` from the client to every backend function, leading to cleaner and less error-prone code.
- **Pro:** Tightly integrated with the Convex environment and simplifies backend authorization logic.
- **Con:** As it is a managed service (similar to Clerk), you don't fully own your user data. It is also a beta feature and may evolve.

### Database Auth Pattern

Convex also supports a pattern for integrating with external auth providers by storing their user information directly in your Convex database.

- **Documentation:** [https://docs.convex.dev/auth/database-auth](https://docs.convex.dev/auth/database-auth)
- **Pro:** Gives you more control over user data within your own database schema.
- **Con:** This approach can require splitting user information between two systems (the auth provider and your Convex database), which can add complexity to data management.

The choice of authentication provider depends on the specific needs of the project, including requirements for data ownership, development speed, and integration complexity.
