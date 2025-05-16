<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '../utils';

	type Props = {
		children: Snippet;
		classes?: string;
	};

	let { children, classes }: Props = $props();
</script>

<span
	class={cn(
		classes,
		'bg-primary/20 text-primary rounded-full px-4 py-1 text-center text-sm font-semibold'
	)}>{@render children()}</span
>
