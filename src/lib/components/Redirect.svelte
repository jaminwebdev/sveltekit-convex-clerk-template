<script lang="ts">
	import { goto } from '$app/navigation';

	type Props = {
		route?: string;
	};

	let { route }: Props = $props();

	$effect(() => {
		if (route) {
			goto(`/${route}`);
			return;
		}
		goto('/');
	});
</script>
