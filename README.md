# svelte-contextify

A tiny library for vastly improving context managament in Svelte apps by encapsulating the Context API.

## Features

1. Removes the need for keys
2. Utilizes symbols to create unique keys
3. Vastly improves type inference

## Install

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

The snippet above show a fairly common use case, we want to store session in context (so it is SSR safe) and pass it down to a child so it can access it safely.
This has 2 problems/annoyances:

1. We need to keep track of the context key (`session`) in 2 different places.
2. We need to keep track of the type in 2 different places.

## How svelte-contextify fixes the problem

svelte-contextify fixes this issue with quite a simple solution:
```ts
import { getContext, setContext } from 'svelte';

export function createContext<T>(fallback?: T) {
	const key = Symbol();
	return [() => getContext<T>(key) ?? fallback, (value: T) => setContext<T>(key, value), key];
}
```

Pretty simple right?

We return 3 things here:

1. The get function: This is responsible for retrieving the value out of context
2. The set function: This is responsible for setting the value in context
3. The generated key: This is a unique symbol that is returned in case you need to use it outside of the supplied get or set functions

This allows you to turn the code snippet from above into:

```ts
// session.ts
type Session = {
	user: string;
};

export const [getSession, setSession, key] = createContext<Session>();
```

```html
<!-- Parent.svelte -->
<script lang="ts">
	import Child from '$lib/Child.svelte';
	import { setSession } from './session.ts';

	setSession({ user: 'Hugos68' }); // Full type safety when setting the session
</script>

<Child />
```

```html
<!-- Child.svelte -->
<script lang="ts">
	import { getSession } from './session.ts';

	const session = getSession(); // type Session is inferred
</script>
```

Not only is it now more readable, it also improves the DX in 2 ways:

1. No need to specify a key anymore (or keep track of)
2. The type only needs to be specified once and is applied to both the getter and setter implicitly
