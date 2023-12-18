import { getContext, setContext } from 'svelte';

export function createContext<T>(key: string) {
	return [
        () => getContext<T>(key),
        (value: T) =>  setContext<T>(key, value)
    ];
};
