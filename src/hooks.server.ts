import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { CLERK_SECRET_KEY } from '$env/static/private';
import { PUBLIC_CLERK_PUBLISHABLE_KEY } from '$env/static/public';
import { withClerkHandler } from 'svelte-clerk/server';

const PROTECTED_ROUTE_PREFIXES = ['/(dashboard)'] as const;

const clerkHandle = withClerkHandler({
	publishableKey: PUBLIC_CLERK_PUBLISHABLE_KEY,
	secretKey: CLERK_SECRET_KEY,
	signInUrl: '/login'
});

const authRedirectHandle: Handle = async ({ event, resolve }) => {
	const routeId = event.route.id;
	const shouldProtect =
		routeId && PROTECTED_ROUTE_PREFIXES.some((prefix) => routeId.startsWith(prefix));

	if (shouldProtect) {
		const auth = event.locals.auth;
		const { userId } = auth();

		if (!userId) {
			throw redirect(302, '/login');
		}
	}

	return resolve(event);
};

export const handle = sequence(clerkHandle, authRedirectHandle);
