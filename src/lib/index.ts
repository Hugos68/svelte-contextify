import { getContext, setContext } from 'svelte';

const keys = new Set<string>();

export type Context<T> = [() => T, (value: T) => void];

export function createContext<T>(key: string): Context<T> {
	if (keys.has(key)) {
		console.warn(`Context with key "${key}" has already been created.`);
	}
	keys.add(key);
	return [() => getContext<T>(key), (value: T) => setContext<T>(key, value)];
}
