<script lang="ts">
	import { SignUp } from 'svelte-clerk/client';
</script>

<div class="flex items-center justify-center py-10">
	<SignUp afterSignUpUrl="/dashboard" redirectUrl="/dashboard" />
</div>
