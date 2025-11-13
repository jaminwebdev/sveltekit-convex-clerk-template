<script lang="ts">
	import { SignIn } from 'svelte-clerk/client';
</script>

<div class="flex items-center justify-center py-10">
	<SignIn redirectUrl="/dashboard" />
</div>
