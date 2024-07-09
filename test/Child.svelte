<script lang="ts">
	import {
		contextWithoutOptions,
		contextWithFallback,
		contextWithOnError,
		contextWithFallbackAndOnError
	} from './context.js';
</script>

<p data-testid="context-without-options">{contextWithoutOptions.get()}</p>
<p data-testid="context-with-fallback">{contextWithFallback.get()}</p>
<p data-testid="context-with-on-error">{contextWithOnError.get()}</p>
<p data-testid="context-with-fallback-and-on-error">{contextWithFallbackAndOnError.get()}</p>
