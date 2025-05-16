<script>
	import MarketingHeader from '@/lib/components/marketing/navigation/MarketingHeader.svelte';
	import MarketingFooter from '@/lib/components/marketing/sections/MarketingFooter.svelte';
	let { children } = $props();
</script>

<MarketingHeader />
{@render children()}
<MarketingFooter />
