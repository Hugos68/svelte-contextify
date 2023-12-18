# svelte-contextify

A tiny library for vastly improving context managament in Svelte apps.

## Features

1. Remove the need to specify a key twice
2. Improved type inference
3. Duplicate key prevention through warnings

## The Problem

In most svelte apps using the context API you will see this pattern:

```html
<!-- Parent.svelte -->
<script lang="ts">
	import { setContext } from 'svelte';
	import type { Session } from '...';

	setContext<Session>('session', { user: 'Hugos68' });
</script>

<!-- Child.svelte -->
<script lang="ts">
	import { getContext } from 'svelte';

	const session = getContext('session');
</script>
```

This is problematic for 2 reason:

1. Duplicate code
   Because the key `session` is used in multiple places we also have to update it in multiple places when we want to change the key.

2. Type safety
   Like reason 1 types also need to be defined twice because `getContext` has no clue what you are trying to get.


## How svelte-contextify fixes the problem

This library was created to fix the problems mentioned in [thep previous paragraph](#the-problem), it only exposes 1 function called createContext and looks like this:

```ts
import { getContext, setContext } from 'svelte';
import type { Session } from '...';

export function createContext<T>(key: string) {
	return [() => getContext<T>(key), (value: T) => setContext<T>(key, value)];
}
```

Pretty simple right?

This allows you to now do this:

```ts
type Session = {
	user: string;
};

export const [getSession, setSession] = createContext<Session>('session');
```

```html
<!-- Parent.svelte -->
<script lang="ts">
	import { setSession } from '...';

	setSession({ user: 'Hugos68' });
</script>

<!-- Child.svelte -->
<script lang="ts">
	import { getSession } from 'svelte';

	const session = getSession();
</script>
```

Now we only need to define the key (in this case `session`) once, on top of that `getSession` now automatically returns the type `Session` without needing to specify it because it is already specified centrally in the `createContext` function.
