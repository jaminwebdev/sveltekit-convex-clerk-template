<script lang="ts">
	import MarketingDesktopNav from '@/lib/components/marketing/navigation/MarketingDesktopNav.svelte';
	import MarketingMobileNav from './MarketingMobileNav.svelte';
</script>

<div class="hidden lg:block">
	<MarketingDesktopNav />
</div>
<div class="block lg:hidden">
	<MarketingMobileNav />
</div>
