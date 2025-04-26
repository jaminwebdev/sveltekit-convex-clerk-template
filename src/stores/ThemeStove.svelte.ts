import { themes, type ThemeOptions } from '@/lib/utils/themes';

export const useTheme = () => {
	let currentTheme = $state(themes[0]);

	$effect(() => {
		const storedTheme = localStorage.getItem('theme');
		if (storedTheme) return handleThemeChange(storedTheme);
		checkSystemColorPreference();
	});

	const handleThemeChange = (theme: ThemeOptions) => {
		currentTheme = theme;
		document.documentElement.className = '';
		document.documentElement.classList.add(theme);
		localStorage.setItem('theme', theme);
	};

	const checkSystemColorPreference = () => {
		const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
		currentTheme = prefersDarkScheme ? 'dark' : 'light';
	};

	return {
		get currentTheme() {
			return currentTheme;
		},
		handleThemeChange
	};
};

export type ThemeContext = {
	currentTheme: string;
	handleThemeChange: (theme: string) => void;
};
