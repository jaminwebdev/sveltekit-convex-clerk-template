# SvelteKit and Convex Integration Pattern

This document outlines the specific architectural pattern used in this project to integrate the SvelteKit frontend with the Convex backend using Clerk for authentication. The pattern ensures that data access is secure and efficient.

In this project we use Svelte and the convex-svelte package together. 

Here's the documentation/github repo for this package: https://github.com/get-convex/convex-svelte

## Overview

The core of the pattern is a **token-based authorization model**. The SvelteKit client is responsible for obtaining the current user's authentication token (via Clerk) and configuring the Convex client to include this token with every request. The Convex backend then extracts the user's identity from this token to filter data and authorize access to specific documents.

This creates a clear separation of concerns:
- **SvelteKit (Client):** Manages UI, user authentication state via Clerk, and configures the Convex client to send authentication tokens with requests. It also handles an initial loading state to prevent UI errors.
- **Convex (Backend):** Defines data schema, business logic, and enforces strict data access rules based on the user identity extracted from the provided authentication token.

## Key Components of the Pattern

### 1. Client-Side User Identity and Convex Client Configuration

- The user's authentication state is managed by Clerk using `svelte-clerk`.
- The `ConvexClient` is configured with a `tokenFetcher` function that retrieves the JWT from the Clerk session and sends it with every Convex request.
- An initial loading state is managed to prevent queries from running before the authentication token is available.

*Example (`src/routes/(dashboard)/+layout.svelte`):*
```svelte
<script lang="ts">
	import { setupConvex, useConvexClient } from 'convex-svelte';
	import { useClerkContext } from 'svelte-clerk/client';
	import { PUBLIC_CONVEX_URL } from '$env/static/public';

	const { children } = $props();
	setupConvex(PUBLIC_CONVEX_URL);
	const ctx = useClerkContext();
	const convex = useConvexClient();

	const clerkIsLoaded = $derived(ctx.isLoaded);

	$effect(() => {
		const tokenFetcher = async () => {
			if (ctx.session) {
				return await ctx.session.getToken({ template: 'convex' });
			}
			return null;
		};
		if (clerkIsLoaded) {
			convex.setAuth(tokenFetcher);
		}
	});
</script>

{#if !clerkIsLoaded}
    <!-- Display a loading indicator while Clerk is loading -->
    <div class="flex h-screen w-full items-center justify-center text-lg text-gray-500">
        Loading authentication...
    </div>
{:else}
    <!-- Render dashboard content when Clerk is loaded -->
    {@render children()}
{/if}
```

### 2. Backend Identity Extraction and Authorization Helper

- The Convex backend defines a helper function (`getAuthenticatedClerkId`) that extracts the authenticated Clerk user ID from the `ctx.auth.getUserIdentity()`.
- This helper centralizes the authentication check and Clerk ID extraction logic, making backend functions cleaner and more secure.

*Example (`src/convex/tasks.ts`):*
```typescript
import type { UserIdentity } from 'convex/server';
import type { QueryCtx, MutationCtx } from './_generated/server';
// ... other imports

const extractClerkId = (identity: UserIdentity) => identity.tokenIdentifier.split('|')[1];

const getAuthenticatedClerkId = async (ctx: QueryCtx | MutationCtx): Promise<string> => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
        throw new Error('Not authenticated');
    }
    return extractClerkId(identity);
};
```

### 3. Fetching Data (Queries)

- The `convex-svelte` package's `useQuery` hook is used to subscribe to Convex queries.
- No `user_id` argument is passed from the frontend; the backend extracts the user ID from the authentication context.

*Example (`TaskList.svelte`):*
```svelte
<script lang="ts">
	import { useQuery } from 'convex-svelte';
	import { api } from '@/convex/_generated/api';
	// ...
	// No user_id prop or argument needed anymore
	const query = $derived(useQuery(api.tasks.get));
</script>

<!-- UI reacts to query state (isLoading, error, data) -->
```

*Example (`tasks.ts` - `get` query):*
```typescript
export const get = query({
	args: {}, // No user_id argument
	handler: async (ctx) => {
		const clerkUserId = await getAuthenticatedClerkId(ctx);
		return await ctx.db
			.query('tasks')
			.withIndex('by_user_id', (q) => q.eq('user_id', clerkUserId))
			.collect();
	}
});
```

### 4. Modifying Data (Mutations)

- The `useConvexClient` hook provides a raw client instance.
- Mutations are called using `client.mutation()`. No `user_id` argument is passed from the frontend.

*Example (`TaskInput.svelte`):*
```svelte
<script lang="ts">
	import { useConvexClient } from 'convex-svelte';
	import { api } from '@/convex/_generated/api';
	// ...
	const client = useConvexClient();

	const createTask = async () => {
		// ...
		await client.mutation(api.tasks.create, { body: taskBody }); // No user_id argument
		// ...
	};
</script>
```

*Example (`tasks.ts` - `update` mutation):*
```typescript
export const update = mutation({
	args: { id: v.id('tasks'), isCompleted: v.boolean() }, // No user_id argument
	handler: async (ctx, args) => {
		const { id, isCompleted } = args;
		const clerkUserId = await getAuthenticatedClerkId(ctx); // Get user ID from ctx

		const task = await ctx.db.get(id);
		if (task === null || task.user_id !== clerkUserId) {
			throw new Error('Not authorized to update this task');
		}
		await ctx.db.patch(id, { isCompleted });
	}
});
```

## Summary

This pattern provides a robust and scalable way to build secure applications with SvelteKit and Convex. By providing the user's authentication token from the client and verifying it on the backend for every relevant operation, we ensure that users can only access and modify their own data, with a cleaner separation of concerns.

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
