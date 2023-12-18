import { getContext, setContext } from 'svelte';

export function createContext<T>(key: string) {
	return {
		getContext() {
			return getContext<T>(key);
		},
		setContext(value: T) {
			return setContext<T>(key, value);
		}
	};
}
