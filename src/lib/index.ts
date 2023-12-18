import { getContext, setContext } from 'svelte';

export function createContext<T>(): [() => T | undefined, (value: T) => void];

export function createContext<T>(fallback: T): [() => T, (value: T) => void];

export function createContext<T>(fallback?: T) {
	const key = Symbol();
	return [() => getContext<T>(key) ?? fallback, (value: T) => setContext<T>(key, value), key];
}
