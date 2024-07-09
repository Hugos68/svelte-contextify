# svelte-contextify

A tiny library for vastly improving context managament in Svelte apps by encapsulating the Context API.

## Features

- Removes the need for keys.
- Removes key collisions by using the [Symbol API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol).
- Ensure type safety when setting and getting context.

## Installation

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

## API

### `createContext(defaultValue)`

See: [Source](./src/index.ts)

## The problem

Let's say we want to share the `session` of a user in our app through context, one might do that like so:

```ts
/** session.ts */

interface Session {
	username: string;
}

export type { Session };
```

```html
<!-- App.svelte -->

<script lang="ts">
	import Component from '$lib/Component.svelte';
	import { setContext } from 'svelte';
	import type { Session } from '$lib/session.ts';

	setContext<Session>('session', { username: 'Hugos68' });
</script>

<Component />
```

```html
<!-- Component.svelte -->

<script lang="ts">
	import { getContext } from 'svelte';
	import type { Session } from '$lib/session.ts';

	const session = getContext<Session>('session');
</script>

<p>Welcome: {session.username}!</p>
```

While this approach does work, it is flawed for 2 reasons:

1. We need to keep track of the context key (`session`) in 2 different places.
2. We need to keep track of the `Session` type in 2 different places.

## How svelte-contextify solves the problem

This library aims to solve the problem by handling the key and type inference _for_ you using the `createContext` function.

This allows you to refactor the code from above, into:

```ts
/** session.ts */

import { createContext } from 'svelte-contextify';

interface Session {
	username: string;
}

const {
	get: getSession,
	set: setSession
} = createContext<Session>({ username: 'guest' });

export { getSession, setSession };
export type { Session };
```

```html
<!-- App.svelte -->

<script lang="ts">
	import Component from '$lib/Component.svelte';
	import { setSession } from '$lib/session.ts';

	setSession({ username: 'Hugos68' });
	//         ^ Type safety when setting context
</script>

<Component />
```

```html
<!-- Component.svelte -->

<script lang="ts">
	import { getSession } from '$lib/session.ts';

	const session = getSession('session');
	//    ^ Type is inferred as Session
</script>

<p>Welcome: {session.username}!</p>
```

As you can see this notably improves using context as we now:

- Don't need to define a key or worry about it.
- Pass the type once.

## License

This project is licensed under the Apache-2.0 License - see the [LICENSE](LICENSE.txt) file for details.
