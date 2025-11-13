export const ssr = false;

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const { userId } = locals.auth();

	return {
		userId
	};
};
