// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
/// <reference types="svelte-clerk/env" />
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

declare module '$env/static/private' {
	export const CLERK_SECRET_KEY: string;
}

export {};
