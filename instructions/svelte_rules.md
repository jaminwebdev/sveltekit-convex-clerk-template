# Svelte 5 AI Agent Instructions & Coding Conventions

## Instructions for AI Agent

You are an expert Svelte 5 and SvelteKit developer. Before implementing any Svelte-related code or providing guidance, you must:

1. **Reference Official Documentation**: Always consult the latest documentation at:
    
    - Svelte 5 Documentation: https://svelte.dev/docs
    - SvelteKit Documentation: https://svelte.dev/docs/kit/
2. **Follow Svelte 5 Modern Patterns**: Use only the new runes system (`$state`, `$derived`, `$effect`, `$props`, `$bindable`, `$inspect`) - never use legacy Svelte stores or reactive statements.
    
3. **Strict Adherence**: Follow ALL the coding conventions, patterns, and rules specified below without deviation. These are not suggestions - they are requirements for consistent, maintainable Svelte 5 code.
    
4. **TypeScript First**: Always use TypeScript with strict typing. Provide proper type annotations and interfaces for all code.
    
5. **Modern Best Practices**: Implement the latest Svelte 5 patterns for state management, reactivity, and component architecture as outlined in the guidelines below.
    

---

# Svelte 5 Coding Conventions & Rules

Svelte documentation: https://svelte.dev/docs 
SvelteKit documentation: https://svelte.dev/docs/kit/

## Core Principles

Svelte Runes

- `$state`: Declare reactive state
    
    ```typescript
    let count = $state(0);
    ```
    
- `$derived`: Compute derived values
    
    ```typescript
    let doubled = $derived(count * 2);
    ```
    
- `$effect`: Manage side effects and lifecycle
    
    ```typescript
    $effect(() => {  console.log(`Count is now ${count}`);});
    ```
    
- `$props`: Declare component props
    
    ```typescript
    let { optionalProp = 42, requiredProp } = $props();
    ```
    
- `$bindable`: Create two-way bindable props
    
    ```typescript
    let { bindableProp = $bindable() } = $props();
    ```
    
- `$inspect`: Debug reactive state (development only)
    
    ```typescript
    $inspect(count);
    ```
    

### 1. Always Use Svelte 5 Runes System

- **NEVER** use old Svelte stores (`writable`, `readable`, `derived`)
- Use `$state()`, `$derived()`, and `$derived.by()` instead
- Leverage the new runes system for all reactive state management

### 2. Strict TypeScript

- Always use TypeScript with strict mode enabled
- All components, stores, and utilities must be properly typed
- No `any` types unless absolutely necessary (document why)

## State Management

### 3. Rune Store File Naming

- **REQUIRED**: Rune stores must use `.svelte.ts` extension
- Example: `counter.svelte.ts`, `userStore.svelte.ts`

### 4. Global State Pattern

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

### 5. Export Both Creator and Instance

- Always export the store creator function
- Always export a singleton instance for global use
- This provides flexibility for both global state and individual instances

```typescript
export const createCounter = (initial = 0) => { /* ... */ };
export const counter = createCounter(); // Global instance
```

### 6. Understanding Proxied State vs Primitives

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

### 7. Destructuring Rules Based on State Type

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

### 7. Always Use Prop Validation/Typing

```typescript
// ✅ Proper prop typing
interface Props {
  user: User;
  isActive?: boolean;
  onUpdate: (user: User) => void;
}

let { user, isActive = false, onUpdate }: Props = $props();
```

### 8. Abstract Event Handlers

**Prefer** dedicated functions over inline handlers:

```typescript
// ❌ Avoid inline handlers
<button onclick={() => count++}>

// ✅ Use dedicated functions
const handleIncrement = () => count++;
<button onclick={handleIncrement}>

```

### 9. Reusable Event Handlers

When event handlers are reused across components, extract them to utility files:

## Reactivity Patterns

### 10. Avoid $effect() - Use Derived State

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

### 11. Async State Management Pattern

For async operations, use this consistent pattern:

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

### 12. Debouncing Pattern

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

## Context & Shared State

### 13. Context API for Component Tree State

Use context for state that needs to be shared within a component tree:

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

### 14. Page Store for Route-Specific Data

Access page data anywhere in the component tree:

```typescript
import { page } from '$app/stores';

// Access route data
const routeData = $derived($page.data);
const currentUser = $derived($page.data.user);
```

## File Organization & Imports

### 15. Import Organization

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

### 16. Type Definitions

Keep types close to their usage or in dedicated type files:

```typescript
// types/user.ts
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export type UserUpdate = Partial<Pick<User, 'firstName' | 'lastName'>>;
```

## Performance Considerations

### 17. Minimize Reactive Scope

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

### 18. Use $derived.by for Expensive Operations

```typescript
let expensiveComputation = $derived.by(() => {
  if (!shouldCompute) return previousResult;
  return performExpensiveOperation(data);
});
```

## Error Handling

### 19. Consistent Error Patterns

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

### 20. Testable Store Structure

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