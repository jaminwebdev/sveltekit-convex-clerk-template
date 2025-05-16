<script>
	import MarketingHeader from '@/lib/components/marketing/navigation/MarketingHeader.svelte';
	let { children } = $props();
</script>

<MarketingHeader />
{@render children()}
