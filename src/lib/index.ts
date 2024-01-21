import { getContext, setContext, hasContext } from 'svelte';

export function createContext<T>(options: { fallback: T; onError?: () => void }): {
	get: () => T;
	set: (value: T) => T;
	has: () => boolean;
	key: symbol;
};

export function createContext<T>(): {
	get: () => T | undefined;
	set: (value: T) => T;
	has: () => boolean;
	key: symbol;
};

export function createContext<T>({
	fallback = undefined,
	onError = () => {}
}: {
	fallback?: T;
	onError?: () => void;
} = {}) {
	const key = Symbol();

	function get<T>() {
		if (!hasContext(key)) {
			onError();
		}
		return getContext<T>(key) ?? fallback;
	}

	function set<T>(value: T) {
		setContext<T>(key, value);
	}

	function has() {
		return hasContext(key);
	}

	return {
		get,
		set,
		has,
		key
	};
}
