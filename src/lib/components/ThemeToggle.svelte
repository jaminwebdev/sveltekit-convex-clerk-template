<script lang="ts">
	import { onMount } from 'svelte';

	import { Sun, Moon } from '@lucide/svelte';
	import * as Dialog from '@/lib/components/ui/dialog/index.js';
	import { Button, buttonVariants } from '@/lib/components/ui/button/index.js';
	import * as RadioGroup from '@/lib/components/ui/radio-group/index';
	import { Label } from '@/lib/components/ui/label';
	import { themes, type ThemeOptions } from '@/lib/utils/themes';

	let currentTheme = $state(themes[0]);
	let isOpen = $state(false);

	onMount(() => {
		const storedTheme = localStorage.getItem('theme');
		if (storedTheme) return handleThemeChange(storedTheme);
		checkSystemColorPreference();
	});

	const handleThemeChange = (theme: ThemeOptions) => {
		currentTheme = theme;
		document.documentElement.className = '';
		document.documentElement.classList.add(theme);
		localStorage.setItem('theme', theme);
		isOpen = false;
	};

	const checkSystemColorPreference = () => {
		const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
		currentTheme = prefersDarkScheme ? 'dark' : 'light';
	};
</script>

<Dialog.Root bind:open={isOpen}>
	<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>
		<div class="bg-muted rounded-full">
			{#if currentTheme.includes('dark')}
				<Moon
					className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
				/>
			{:else}
				<Sun
					className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
				/>
			{/if}
			<span class="sr-only">Toggle theme</span>
		</div>
	</Dialog.Trigger>
	<Dialog.Content class="max-h-[75vh] overflow-y-scroll">
		<RadioGroup.Root value={currentTheme} onValueChange={handleThemeChange}>
			{#each themes as theme}
				<div class="flex items-center space-x-2">
					<RadioGroup.Item value={theme} id={theme} />
					<Label for={theme} class="flex items-center gap-2">
						{#if theme.includes('light')}
							<Sun />
						{:else}
							<Moon />
						{/if}
						{theme}
					</Label>
				</div>
			{/each}
		</RadioGroup.Root>
	</Dialog.Content>
</Dialog.Root>
