import { getContext, setContext } from 'svelte';

type ThemeStore = {
	currentTheme: string;
	handleThemeChange: (theme: string) => void;
};

const themeKey = Symbol('theme');

export const setThemeContext = (storeCreator: () => ThemeStore) =>
	setContext(themeKey, storeCreator());

export const getThemeContext = (): ThemeStore => getContext(themeKey);
