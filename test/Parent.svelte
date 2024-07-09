<script lang="ts">
	import {
		contextWithoutOptions,
		contextWithFallback,
		contextWithOnError,
		contextWithFallbackAndOnError
	} from './context.js';
	import Child from './Child.svelte';

	contextWithoutOptions.set('foo');
	contextWithFallback.set('foo');
	contextWithOnError.set('foo');
	contextWithFallbackAndOnError.set('foo');
</script>

<Child />
