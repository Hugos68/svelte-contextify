# svelte-contextify

A tiny library for vastly improving context managament in Svelte apps.

## Features

1. Requires you to define the context key only once
2. Vastly improves type inference
3. Warns about duplicate context keys

## The Problem

In most svelte apps using the context API you will see this pattern:

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
	import type { Session } from '$lib/session.ts';

	setContext<Session>('session', { user: 'Hugos68' });
</script>

<!-- Child.svelte -->
<script lang="ts">
	import { getContext } from 'svelte';
	import type { Session } from '$lib/session.ts';

	const session = getContext<Session>('session');
</script>
```

This is problematic for 2 reason:

1. Duplicate code,
   because the key `session` is used in multiple places we also have to update it in multiple places when we want to change the key.

2. Type safety,
   like reason 1 types also need to be defined twice because `getContext` has no clue what you are trying to get.


## How svelte-contextify fixes the problem

This library was created to fix the problems mentioned in [the previous paragraph](#the-problem), it only exposes 1 function called createContext and looks like this:

```ts
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
```

Pretty simple right?

This allows you to now do this:

```ts
// session.ts
type Session = {
	user: string;
};

export const [getSession, setSession] = createContext<Session>('session');
```

```html
<!-- Parent.svelte -->
<script lang="ts">
	import { setSession } from './session.ts';

	setSession({ user: 'Hugos68' }); // Full type safety when setting the session
</script>

<!-- Child.svelte -->
<script lang="ts">
	import { getSession } from './session.ts';

	const session = getSession(); // type Session is inferred
</script>
```

Now we only need to define the key (in this case `session`) once, on top of that `getSession` now automatically returns the type `Session` without needing to specify it because it is already specified centrally in the `createContext` function.
