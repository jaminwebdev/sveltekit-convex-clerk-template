# Svelte and SvelteKit AI Agent Instructions & Coding Conventions

## Instructions for AI Agent

You are an expert Svelte 5 and SvelteKit developer. Before implementing any Svelte-related code or providing guidance, you must:

1. **Reference Official Documentation**: Always consult the latest documentation at:
    - Key Svelte 5 Documentation:
	    - \$state: https://svelte.dev/docs/svelte/$state
	    - \$derived: https://svelte.dev/docs/svelte/$derived
	    - \$effect: https://svelte.dev/docs/svelte/$effect
	    - \$props: https://svelte.dev/docs/svelte/$props
	    - \$bindable: https://svelte.dev/docs/svelte/$bindable
	    - snippets: https://svelte.dev/docs/svelte/snippet
	    - render: https://svelte.dev/docs/svelte/@render
	    - attachments: https://svelte.dev/docs/svelte/@attach
		    - actions (older): https://svelte.dev/docs/svelte/use
	    - local constants: https://svelte.dev/docs/svelte/@const
	    - bind: https://svelte.dev/docs/svelte/bind
	    - svelte boundary: https://svelte.dev/docs/svelte/svelte-boundary
	    - svelte window: https://svelte.dev/docs/svelte/svelte-window
	    - dynamic components: https://svelte.dev/docs/svelte/v5-migration-guide#svelte:component-is-no-longer-necessary
    - Key SvelteKit Documentation:
	    - Routing: https://svelte.dev/docs/kit/routing
		    - Advanced Routing: https://svelte.dev/docs/kit/advanced-routing
	    - Loading data: https://svelte.dev/docs/kit/load
	    - Form Actions: https://svelte.dev/docs/kit/form-actions
	    - State Management: https://svelte.dev/docs/kit/state-management
	    - Remote Functions: https://svelte.dev/docs/kit/remote-functions
	    - Hooks: https://svelte.dev/docs/kit/hooks
	    - Errors: https://svelte.dev/docs/kit/errors
	    - DB setup: https://svelte.dev/docs/kit/faq#How-do-I-set-up-a-database
	    - environment variables:
		    - private: https://svelte.dev/docs/kit/$env-static-private
		    - public: https://svelte.dev/docs/kit/$env-static-public
2. **Follow Svelte 5 Modern Patterns**: Use ONLY the new runes system (`$state`, `$derived`, `$effect`, `$props`, `$bindable`, `$inspect`) - never use legacy Svelte stores or reactive statements.
    
3. **Strict Adherence**: Follow ALL the coding conventions, patterns, and rules specified below without deviation. These are not suggestions - they are requirements for consistent, maintainable Svelte 5 code.
    
4. **TypeScript First**: Always use TypeScript with strict typing. Provide proper type annotations and interfaces for all code. No `any` types unless absolutely necessary (document why)
    
5. **Modern Best Practices**: Implement the latest Svelte 5 patterns for state management, reactivity, and component architecture as outlined in the guidelines below.
    

---

# Svelte Coding Conventions & Rules

## State Management

For applications that require client-side state management be managed on a large scale (globally or for a portion of the component tree), follow the following conventions:
### 1. Rune Store File Naming

- **REQUIRED**: Rune stores must use `.svelte.ts` extension
- Example: `counter.svelte.ts`, `userStore.svelte.ts`

### 2. Global State Pattern

**"Functions with Accessors" Pattern (Recommended for clean APIs)**

```typescript
export const createCounter = (initialValue) => {
	// Same logic, only code rewrite is in return!
	let count = $state({ value: initialValue});
	let doubledCount = $derived(count.value * 2);
	let isEven = $derived(count.value % 2 === 0);
	let isOdd = $derived(!isEven);

	const inc = () => count.value++
	const dec = () => count.value--
	
	return {
		get count() { return count },
		get doubledCount() { return doubledCount },
		get isOdd() { return isOdd },
		get isEven() { return isEven },
		inc, 
		dec
	}
}

export const counterStore = createCounter(0)
```

In use:

```html
<script>
	import {counterStore} from './runes.svelte.js'
	let {inc, dec} = counterStore
</script>

Count: {counterStore.count.value}
<br />
Doubled count: {counterStore.doubledCount}
<br />
isEven: {counterStore.isEven}
<br />
isOdd: {counterStore.isOdd}
<br />

<button on:click={inc}>Increment</button>
<button on:click={dec}>Decrement</button>
```

### 3. Export Both Creator and Instance

- Always export the store creator function
- Always export a singleton instance for global use
- This provides flexibility for both global state and individual instances

```typescript
export const createCounter = (initial = 0) => { /* ... */ };
export const counter = createCounter(); // Global instance
```

### 4. Understanding Proxied State vs Primitives

Svelte automatically wraps objects passed to `$state()` in proxies, which affects cross-import boundaries and destructuring behavior.

**Primitive values cannot cross import boundaries:**

```typescript
// ❌ This will error - "Imported values can only be modified by the exporter"
// counter.svelte.ts
export let count = $state(0);

// Component trying to use it
import { count } from './counter.svelte.ts';
// count++ // ❌ Error!
```

**Objects become proxies and CAN cross import boundaries:**

```typescript
// ✅ This works because objects are proxied
// counter.svelte.ts
export let count = $state({ value: 0 });

// Component using it
import { count } from './counter.svelte.ts';
// count.value++ // ✅ Works!
```

### 5. Destructuring Rules Based on State Type

**For stores returning PRIMITIVE reactive values:**

```typescript
// ❌ DON'T destructure primitives directly
const { count, increment } = counterStore;

// ✅ Either don't destructure
const store = counterStore;
// Access via: store.count, store.increment

// ✅ OR wrap in $derived for primitives
const { count, increment } = $derived(counterStore);
```

**For stores using OBJECT-wrapped state:**

```typescript
// With object-wrapped state, destructuring works without $derived
export const createCounter = () => {
  let count = $state({ value: 0 }); // Object = proxy
  const increment = () => count.value += 1
  
  return {
    get count() { return count }, 
    increment
  };
};

// ✅ This works without $derived (because count is a proxy object)
const { count, increment } = createCounter();
// Access via: count.value
```

CRITICAL: **Prefer using objects as state instead of primitives to avoid confusion.** This way, there's no concern about destructuring the

## Component Best Practices

### 1. Always Use Prop Validation/Typing

```typescript
// ✅ Proper prop typing
interface Props {
  user: User;
  isActive?: boolean;
  onUpdate: (user: User) => void;
}

let { user, isActive = false, onUpdate }: Props = $props();
```

### 2. Abstract Event Handlers

**Prefer** dedicated functions over inline handlers:

```typescript
// ❌ Avoid inline handlers
<button onclick={() => count++}>

// ✅ Use dedicated functions
const handleIncrement = () => count++;
<button onclick={handleIncrement}>

```

## Reactivity Patterns

### 1. Avoid $effect() - Use Derived State

**Prefer** `$derived` and `$derived.by` over `$effect`:

```typescript
// ❌ Avoid $effect for computed values
let doubled = $state(0);
$effect(() => {
  doubled = count * 2;
});

// ✅ Use $derived instead
let doubled = $derived(count * 2);

// ✅ For complex derivations, use $derived.by
let expensiveComputation = $derived.by(() => {
  if (!data) return null;
  return performComplexCalculation(data);
});
```

### 2. Async State Management Pattern

For async operations on the client, one can use this consistent pattern:

```typescript
// asyncStore.svelte.ts
class AsyncResponse<T> {
  data = $state<T | null>(null);
  error = $state<Error | null>(null);
  isLoading = $state(false);
}

export const createAsyncStore = <T>() => {
  const response = new AsyncResponse<T>();

  const execute = async (asyncFn: () => Promise<T>) => {
    response.isLoading = true;
    response.error = null;
    
    try {
      response.data = await asyncFn();
    } catch (err) {
      response.error = err instanceof Error ? err : new Error(String(err));
      response.data = null;
    } finally {
      response.isLoading = false;
    }
  };

  return {
    get data() { return response.data; },
    get error() { return response.error; },
    get isLoading() { return response.isLoading; },
    execute
  };
};
```

Of course, this is better handled by Tanstack Query's Svelte package: https://tanstack.com/query/v4/docs/framework/svelte/overview

### 3. Debouncing Pattern

Standard debounce implementation for common use cases:

```typescript
// lib/debounce.ts
export const debounce = <T extends (...args: any[]) => any>(
  callback: T,
  delay = 500
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
};

// Usage in component:
let query = $state('');
let debouncedQuery = $state('');

const updateDebouncedQuery = debounce((value: string) => {
  debouncedQuery = value;
}, 750);

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  query = target.value;
  updateDebouncedQuery(target.value);
};
```

## File Organization & Imports

### 1. Import Organization

Structure imports in this order:

1. Svelte/SvelteKit imports
2. Third-party libraries
3. Internal utilities/stores
4. Relative imports (components, etc.)

```typescript
// Svelte imports
import { onMount } from 'svelte';
import { page } from '$app/stores';

// Third-party
import { z } from 'zod';

// Internal utilities
import { createUserStore } from '$lib/stores/user.svelte.ts';
import { debounce } from '$lib/utils/debounce.ts';

// Components
import UserProfile from './UserProfile.svelte';
```

## Performance Considerations

### 1. Minimize Reactive Scope

Keep reactive statements as focused as possible:

```typescript
// ❌ Over-reactive
let expensiveResult = $derived(
  someComplexCalculation(data, otherData, moreData)
);

// ✅ More focused reactivity
let processedData = $derived(processData(data));
let result = $derived(calculate(processedData, otherData));
```

### 2. Use $derived.by for Expensive Operations

```typescript
let expensiveComputation = $derived.by(() => {
  if (!shouldCompute) return previousResult;
  return performExpensiveOperation(data);
});
```

## Error Handling

### 1. Consistent Error Patterns

```typescript
interface ErrorState {
  message: string;
  code?: string;
  retry?: () => void;
}

const createErrorHandler = (fallback: string) => {
  return (error: unknown): ErrorState => {
    if (error instanceof Error) {
      return { message: error.message };
    }
    return { message: fallback };
  };
};
```

## Testing Considerations

### 1. Testable Store Structure

Design stores to be easily testable:

```typescript
export const createTestableStore = (dependencies = {}) => {
  // Accept dependencies for easier mocking
  const { apiClient = defaultApiClient } = dependencies;
  
  // ... store implementation
  
  return {
    // ... public interface
    // Include test helpers if needed
    __test: {
      reset: () => { /* reset state */ },
      setState: (state: any) => { /* set state for testing */ }
    }
  };
};
```

---
# SvelteKit Specifics

## Protecting Routes
### 1. hooks.server.ts

This file only runs when a given layout or route requires data from the server. The way SvelteKit knows this is if a +layout.server.ts or a +page.server.ts is included in their respective layout or page. 

There are times, though you may want to run these server hooks without requiring an empty +page.server.ts - such as guarding routes from the server-side even if they only have client logic. 

To accomplish this, you can absolutely still add a +page.server.ts for said routes, but an easier approach is to return dynamic data from either its closest +layout.server.ts, or the root +layout.server.ts if you want these hooks to run every time:

```ts
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ url }) => {
	return {
		pathname: url.pathname
	}
}
```

This will force any route that resides within the purview of this layout file to always hit the server, even if it only has client-side logic. 

### 2. Protecting Route Groups with hooks.server.ts

If you wanted to guard a group of routes within a route group such as (protected), you can check for the `route.id` as follows:

```ts
import { redirect, type Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
	if (event.route.id?.includes?('/protected')) {
		// check for auth, or any other operation to guard the route
		if (!condition_not_met) {
			redirect(303, '/');
		}
	}
}
```

## Context & Shared State

### 1. Context API for Component Tree State

For SvelteKit applications, use context for state that needs to be shared within a component tree, or application-wide:

```typescript
// In layout or parent component
import { setContext } from 'svelte';
import { createUserStore } from './userStore.svelte.ts';

const userStore = createUserStore(initialUserData);
setContext('userStore', userStore);

// In child components
import { getContext } from 'svelte';

const userStore = getContext<ReturnType<typeof createUserStore>>('userStore');
// Don't destructure: use userStore.user, userStore.login, etc.
```

This avoids sharing state between instances of the app. More info can be found here: https://svelte.dev/docs/kit/state-management#Avoid-shared-state-on-the-server

If one were to only use a singleton exported from a whatever.svelte.ts file without wrapping it in context (something that only works client-side), then the state would likely be shared between server instances.
### 2. Page Store for Route-Specific Data

https://svelte.dev/docs/kit/$app-state#page

A read-only reactive object with information about the current page, serving several use cases:

- retrieving the combined `data` of all pages/layouts anywhere in your component tree (also see [loading data](https://svelte.dev/docs/kit/load))
- retrieving the current value of the `form` prop anywhere in your component tree (also see [form actions](https://svelte.dev/docs/kit/form-actions))
- retrieving the page state that was set through `goto`, `pushState` or `replaceState` (also see [goto](https://svelte.dev/docs/kit/$app-navigation#goto) and [shallow routing](https://svelte.dev/docs/kit/shallow-routing))
- retrieving metadata such as the URL you’re on, the current route and its parameters, and whether or not there was an error

```html
<script lang="ts">
	import { page } from '$app/state';
</script>

<p>Currently at {page.url.pathname}</p>

{#if page.error}
	<span class="red">Problem detected</span>
{:else}
	<span class="small">All systems operational</span>
{/if}
```

Changes to `page` are available exclusively with runes. (The legacy reactivity syntax will not reflect any changes)

```html
<script lang="ts">
	import { page } from '$app/state';
	const id = $derived(page.params.id); // This will correctly update id for usage on this page
	$: badId = page.params.id; // Do not use; will never update after initial load
</script>
```

On the server, values can only be read during rendering (in other words _not_ in e.g. `load` functions). In the browser, the values can be read at any time.

## Data Flow & Data Loading

SvelteKit provides multiple patterns for managing data flow between client and server. Choose the pattern that best fits your application's architecture and requirements.

### Pattern 1: Client-Side Fetch with API Routes

Using native `fetch` on the client with SvelteKit API route handlers (`+server.ts` files).

**Not Recommended** - Prefer server-side data loading patterns for better performance, SEO, and security.

```typescript
// src/routes/api/users/+server.ts
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals }) => {
  // locals.user populated by hooks.server.ts
  if (!locals.user) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const users = await db.users.findMany();
  return json(users);
};
```

```typescript
// src/routes/dashboard/+page.svelte
<script lang="ts">
  import type { User } from '$lib/types';
  
  let users = $state<User[]>([]);
  let isLoading = $state(true);
  
  const loadUsers = async () => {
    const response = await fetch('/api/users');
    users = await response.json();
    isLoading = false;
  };
  
  $effect(() => {
    loadUsers();
  });
</script>

{#if isLoading}
  <p>Loading...</p>
{:else}
  {#each users as user}
    <div>{user.name}</div>
  {/each}
{/if}
```

**Limitations:**

- No SSR/SSG benefits
- Waterfall loading (HTML first, then data)
- More client-side JavaScript
- Harder to implement progressive enhancement

---

### Pattern 2: Page Loaders & Form Actions (Recommended)

The standard SvelteKit approach using `load` functions for data fetching and form actions for mutations.

#### Loading Data

```typescript
// src/routes/dashboard/+page.server.ts
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) {
    error(401, 'Unauthorized');
  }
  
  const users = await db.users.findMany();
  
  return {
    users
  };
};
```

```typescript
// src/routes/dashboard/+page.svelte
<script lang="ts">
  import type { PageData } from './$types';
  
  let { data }: { data: PageData } = $props();
</script>

{#each data.users as user}
  <div>{user.name}</div>
{/each}
```

#### Mutating Data with Form Actions

```typescript
// src/routes/dashboard/+page.server.ts
import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(2),
  email: z.string().email()
});

export const actions: Actions = {
  createUser: async ({ request, locals }) => {
    if (!locals.user) {
      return fail(401, { error: 'Unauthorized' });
    }
    
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    
    const result = userSchema.safeParse(data);
    if (!result.success) {
      return fail(400, { 
        errors: result.error.flatten().fieldErrors 
      });
    }
    
    const user = await db.users.create({ data: result.data });
    
    return { success: true, user };
  }
};
```

```typescript
// src/routes/dashboard/+page.svelte
<script lang="ts">
  import type { PageData, ActionData } from './$types';
  import { enhance } from '$app/forms';
  
  let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<form method="POST" action="?/createUser" use:enhance>
  <input name="name" type="text" required />
  <input name="email" type="email" required />
  
  {#if form?.errors?.name}
    <span class="error">{form.errors.name}</span>
  {/if}
  {#if form?.errors?.email}
    <span class="error">{form.errors.email}</span>
  {/if}
  
  <button type="submit">Create User</button>
</form>

{#if form?.success}
  <p>User created successfully!</p>
{/if}
```

**Benefits:**

- SSR/SSG support out of the box
- Progressive enhancement (works without JavaScript)
- Type-safe data flow with generated `$types`
- Automatic revalidation after mutations
- Better SEO and initial page load performance

---

### Pattern 3: Remote Functions (Experimental)

**Coming Soon**: SvelteKit is developing remote functions as a streamlined alternative to loaders and actions.

Remote functions will allow you to call server-side functions directly from the client with full type safety, similar to how tRPC or Convex work.

```typescript
// Future API (subject to change)
// src/routes/users.server.ts
export async function getUsers() {
  'use server';
  const users = await db.users.findMany();
  return users;
}

export async function createUser(data: UserInput) {
  'use server';
  return await db.users.create({ data });
}
```

```typescript
// src/routes/dashboard/+page.svelte
<script lang="ts">
  import { getUsers, createUser } from './users.server.ts';
  
  let users = $state([]);
  
  const loadUsers = async () => {
    users = await getUsers(); // Type-safe, direct server call
  };
  
  const handleSubmit = async (data: UserInput) => {
    await createUser(data);
    await loadUsers(); // Refresh
  };
</script>
```

For production use today, consider dedicated backend-as-a-service solutions that provide similar developer experience with real-time capabilities.

**Status**: Experimental - not recommended for production yet.  
**Documentation**: [https://svelte.dev/docs/kit/remote-functions](https://svelte.dev/docs/kit/remote-functions)

---

### Pattern 4: Backend-as-a-Service Integration

For applications using services like Convex, Supabase, or Firebase, data flow happens primarily through client-side SDKs with real-time subscriptions.

```typescript
// src/routes/dashboard/+page.svelte
<script lang="ts">
  import { useQuery } from 'convex-svelte'; // or equivalent
  import { api } from '$lib/convex/_generated/api';
  
  // Real-time reactive query
  const users = useQuery(api.users.list);
</script>

{#if $users === undefined}
  <p>Loading...</p>
{:else}
  {#each $users as user}
    <div>{user.name}</div>
  {/each}
{/if}
```

**Note**: When using BaaS platforms, you typically bypass SvelteKit's server-side data loading features (loaders, actions, API routes) in favor of the platform's client SDK. However, you still need proper authentication guards (see below).

---
### Authentication & Route Protection

Regardless of your data loading pattern, authentication must be implemented at both the server and client levels.

#### Server-Side Protection (hooks.server.ts)

```typescript
// src/hooks.server.ts
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  // Example with Clerk
  const session = await event.locals.auth.getSession();
  event.locals.user = session?.user ?? null;
  
  // Example with Better Auth
  // const session = await betterAuth.api.getSession({ headers: event.request.headers });
  // event.locals.user = session?.user ?? null;
  
  // Protect routes
  if (event.route.id?.startsWith('/(protected)')) {
    if (!event.locals.user) {
      redirect(303, '/login');
    }
  }
  
  return resolve(event);
};
```

#### Client-Side Auth Context

Create a client-side auth store that mirrors server state, making user data available throughout your component tree:

```typescript
// src/lib/stores/auth.svelte.ts
import { setContext, getContext } from 'svelte';

interface User {
  id: string;
  email: string;
  // ... other fields
}

export const createAuthStore = (initialUser: User | null) => {
  let user = $state<User | null>(initialUser);
  
  const setUser = (newUser: User | null) => {
    user = newUser;
  };
  
  return {
    get user() { return user; },
    setUser
  };
};

// Context helpers
const AUTH_KEY = Symbol('auth');

export const setAuthContext = (initialUser: User | null) => {
  const store = createAuthStore(initialUser);
  setContext(AUTH_KEY, store);
  return store;
};

export const getAuthContext = () => {
  return getContext<ReturnType<typeof createAuthStore>>(AUTH_KEY);
};
```

```typescript
// src/routes/+layout.svelte
<script lang="ts">
  import type { LayoutData } from './$types';
  import { setAuthContext } from '$lib/stores/auth.svelte';
  
  let { data }: { data: LayoutData } = $props();
  
  // Initialize auth context with server data
  setAuthContext(data.user);
</script>

<slot />
```

```typescript
// src/routes/+layout.server.ts
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  return {
    user: locals.user // From hooks.server.ts
  };
};
```

```typescript
// Usage in any component
<script lang="ts">
  import { getAuthContext } from '$lib/stores/auth.svelte';
  
  const auth = getAuthContext();
</script>

{#if auth.user}
  <p>Welcome, {auth.user.email}</p>
{:else}
  <p>Not logged in</p>
{/if}
```

---

### Pattern Comparison

|Pattern|SSR/SSG|Progressive Enhancement|Type Safety|Real-time|Complexity|Best For|
|---|---|---|---|---|---|---|
|**Client Fetch + API Routes**|❌|❌|⚠️ Manual|❌|Medium|Legacy migrations, specific API needs|
|**Loaders + Form Actions**|✅|✅|✅ Generated|❌|Low|Traditional web apps, SEO-critical|
|**Remote Functions**|✅|⚠️ TBD|✅ Automatic|❌|Low|Future: simplified full-stack|
|**Backend-as-a-Service**|⚠️ Partial|❌|✅ SDK|✅|Low|Real-time apps, rapid development|

**Recommendations:**

- **Default choice**: Pattern 2 (Loaders + Form Actions) - battle-tested, full SvelteKit integration
- **Real-time needs**: Pattern 4 (BaaS) - when you need live data subscriptions
- **Future-proofing**: Watch Pattern 3 (Remote Functions) - may become the standard
- **Avoid**: Pattern 1 (Client Fetch) - unless you have specific requirements


## Misc.
### 1. URL State Patterns

More info can be found here: https://svelte.dev/docs/kit/state-management#Storing-state-in-the-URL

A URL reactive lives natively in Svelte as well: https://svelte.dev/docs/svelte/svelte-reactivity#SvelteURL

There's also the Runed npm package which includes a helper: https://runed.dev/docs/utilities/use-search-params

## Quick Reference Checklist

- [ ] Using `.svelte.ts` for rune stores
- [ ] Choosing appropriate state pattern (Accessor vs Proxy)
- [ ] Understanding primitive vs object reactivity rules
- [ ] Exporting both creator and instance
- [ ] Following destructuring rules based on state type
- [ ] Using proper TypeScript typing
- [ ] Abstracting event handlers
- [ ] Preferring `$derived` over `$effect`
- [ ] Following consistent async patterns
- [ ] Implementing proper error handling
- [ ] Organizing imports correctly

