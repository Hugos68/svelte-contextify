import { getContext, setContext } from 'svelte';

export type Context<T> = [() => T, (value: T) => void];

export function createContext<T>(key: string): Context<T> {
	const uniqueKey = Symbol(key);
	return [() => getContext<T>(uniqueKey), (value: T) => setContext<T>(uniqueKey, value)];
}
