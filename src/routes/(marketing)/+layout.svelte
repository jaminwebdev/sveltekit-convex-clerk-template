<script>
	import MarketingHeader from '@/routes/(marketing)/MarketingHeader.svelte';
	let { children } = $props();
</script>

<MarketingHeader />
{@render children()}
