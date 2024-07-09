# svelte-contextify

A tiny library for vastly improving context managament within your Svelte/SvelteKit apps by encapsulating the [Context API](https://svelte.dev/docs/svelte#setcontext).

## Features

- Removes the need for keys.
- Removes key collisions by using the [Symbol API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol).
- Improves type safety when setting and getting context.
- Improves error handling when retrieving unset context.

## Installation

Install through [npm](https://www.npmjs.com/package/svelte-contextify) using your preferred package manager:

```bash
npm i svelte-contextify
```

```bash
pnpm add svelte-contextify
```

```bash
yarn add svelte-contextify
```

```bash
bun add svelte-contextify
```

## API

### `createContext(options)`

See: [source](./src/index.ts#L75)

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
s
<p>Welcome: {session.username}!</p>
```

While this approach does work, it is flawed for two reasons:

1. We need to keep track of the context key (`session`) in atleast two different places.
2. We need to keep track of the `Session` type in atleast two different places.

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

As you can see this notably improved using context as we now:

- Don't need to define a key at all, which removes the need to keep the keys in sync.
- Only have to pass the type once when creating the context, which removes the need from keeping the types in sync.

## License

This project is licensed under the Apache-2.0 License - see the [LICENSE](LICENSE.txt) file for details.
