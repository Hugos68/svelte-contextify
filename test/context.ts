import { createContext } from '../src/lib';

export const contextWithoutOptions = createContext();

export const contextWithFallback = createContext({ fallback: 'fallback' });

export const contextWithOnError = createContext({ onError: () => {} });

export const contextWithFallbackAndOnError = createContext({
	fallback: 'fallback',
	onError: () => {}
});
