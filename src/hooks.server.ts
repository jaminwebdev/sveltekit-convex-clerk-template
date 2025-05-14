import { withClerkHandler } from 'svelte-clerk/server';
import { PUBLIC_CLERK_PUBLISHABLE_KEY } from '$env/static/public';
import { CLERK_SECRET_KEY } from '$env/static/private';

export const handle = withClerkHandler({
	publishableKey: PUBLIC_CLERK_PUBLISHABLE_KEY,
	secretKey: CLERK_SECRET_KEY
});
