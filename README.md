# svelte-contextify

A tiny library for vastly improving context managament in Svelte apps by encapsulating the Context API.

## Features

1. Removes the need for keys
2. Avoids key collision by using symbols
3. Improves type inference for setting and getting context
4. Improves error handling when retrieving unset context.

## Install

### npm

```
npm i svelte-contextify
```

```
pnpm add svelte-contextify
```

```
yarn add svelte-contextify
```

```
bun add svelte-contextify
```

### Local

Instead of adding another dependency to your project you can simply copy paste the code from `src/lib/index.ts` into your project.

## API

```ts
const {
	get,
	set,
	has,
	key
} = createContext({
	fallback: 'foo',
	onError: () => console.log('Uh oh');
});
```

### fallback

The `fallback` value will be returned when context is trying to be retrieved while context has not been set, the default value is undefined.

### onError

The `onError` callback will be called when context is trying to be retrieved while context has not been set.

### get

The `get` function returns context, if context has not been set it returns the `fallback` value.

### set

The `set` function sets context, returns the value that has been set.

### has

The `has` function returns a boolean wether context has been set.

### key

The `key` value is a unique symbol for the context.

## The problem

```ts
// session.ts
export type Session = {
	user: string;
};
```

```html
<!-- Parent.svelte -->
<script lang="ts">
	import { setContext } from 'svelte';
	import Child from '$lib/Child.svelte';
	import type { Session } from '$lib/session.ts';

	setContext<Session>('session', { user: 'Hugos68' });
</script>

<Child />
```

```html
<!-- Child.svelte -->
<script lang="ts">
	import { getContext } from 'svelte';
	import type { Session } from '$lib/session.ts';

	const session = getContext<Session>('session');
</script>
```

The snippet above show a fairly common use case, we want to store session in context in a parent so it's children can access it without prop drilling.

This has 2 problems/annoyances:

1. We need to keep track of the context key (`session`) in 2 different places.
2. We need to keep track of the `Session` type in 2 different places.

## How svelte-contextify fixes the problem

svelte-contextify solves the problem by handling the key and type inference _for_ you using a `createContext` function.

This allows you to turn the code snippet from above into:

```ts
// session.ts
type Session = {
	user: string;
};
export const { get: getSession, set: setSession, has: hasSession, key } = createContext<Session>();
```

```html
<!-- Parent.svelte -->
<script lang="ts">
	import Child from '$lib/Child.svelte';
	import { setSession } from './session.ts';

	setSession({ user: 'Hugos68' }); // Type safety and intellisense
</script>

<Child />
```

```html
<!-- Child.svelte -->
<script lang="ts">
	import { getSession } from './session.ts';

	const session = getSession(); // Session type is inferred
</script>
```
