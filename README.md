# svelte-contextify

A super simple library for easier context management across your app.

In most svelte apps using the context API you will see this pattern:

```html
<!-- Parent.svelte -->
<script>
    import { setContext } from 'svelte';

    const session = createSession(...);

    setContext('session', session);
</script>

<!-- Child.svelte -->
<script>
    import { getContext } from 'svelte';

    const session = getContext('session');
</script>
```

This is problematic because now have to keep track that both components use `session` as their key, so changing one won't change the other one (this can be very serious when having context that is being retrieved in multiple places).

This library was created to fix this problem, it only exposes 1 function called createContext and looks like this:
```js
import { getContext, setContext } from 'svelte';

export function createContext<T>(key: string) {
	return [
        () => getContext<T>(key),
        (value: T) =>  setContext<T>(key, value)
    ];
};
```
Pretty simple right?

This allows you to do this:

```js
export const [getSession, setSession] = createContext('session');
```

```html
<!-- Parent.svelte -->
<script>
    import { getSession } from '...';

    const session = createSession(...);

    setSession(session);
</script>

<!-- Child.svelte -->
<script>
    import { getSession } from 'svelte';

    const session = getSession();
</script>
```

As you can see the key is now only defined once and will update accordingly wherever it's used.