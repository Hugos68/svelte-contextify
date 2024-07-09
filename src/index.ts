import { getContext, hasContext, setContext } from "svelte";

/**
 * Options for the `createContext` function.
 */
interface Options<value> {
	/**
	 * The default value for the context.
	 *
	 * @default null
	 */
	defaultValue?: value;
	/**
	 * Function that is called when context has not been set but is trying to be gotten.
	 *
	 * @default () => {}
	 */
	onError?: (...args: unknown[]) => unknown;
}

/**
 * The return type of the `createContext` function.
 */
interface Context<SetValue, GetValue = SetValue> {
	/**
	 * A unique symbol used to identify the context.
	 */
	key: symbol;
	/**
	 * A function that retrieves the current value of the context.
	 * If a `defaultValue` was provided and the context has not been set, it will return the `defaultValue`.
	 * If an `onError` function is provided and the context has not been set, it will be called.
	 *
	 * @returns {GetValue} The value of the context
	 */
	get: () => GetValue;
	/**
	 * A function that sets the value of the context.
	 *
	 * @param {SetValue} value - The value to set
	 * @returns {SetValue} The value that was set
	 */
	set: (value: SetValue) => SetValue;
	/**
	 * A function that checks if the context has been set.
	 *
	 * @returns {boolean} Whether the context has been set
	 */
	has: () => boolean;
}

/**
 * All the overloads for the `createContext` function.
 */
interface CreateContext {
	<Value>(options: {
		defaultValue: Value;
		onError: (...args: unknown[]) => unknown;
	}): Context<Value>;
	<Value>(options: {
		defaultValue: Value;
	}): Context<Value>;
	<Value>(options: {
		onError: (...args: unknown[]) => unknown;
	}): Context<Value, Value | null>;
	<Value>(): Context<Value, Value | null>;
}

/**
 * Creates a context object

 * @param {Options<Value>} options - Options
 * @return {Context<Value>} The created context object
 */
const createContext: CreateContext = <Value>(
	options: Options<Value> = {},
): Context<Value, Value | null> => {
	const { defaultValue = null, onError = () => {} } = options;
	const key = Symbol();
	const get = () => {
		if (!hasContext(key)) {
			onError();
		}
		return getContext<Value>(key) ?? defaultValue;
	};
	const set = (value: Value) => {
		return setContext<Value>(key, value);
	};
	const has = () => {
		return hasContext(key);
	};
	return { key, get, set, has };
};

export { createContext };
export type { Options, Context, CreateContext };
