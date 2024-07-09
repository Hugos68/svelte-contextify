<script lang="ts">
import type { Context } from "../../src/index.js";

const { context }: { context: Context<string> } = $props();
</script>

<p data-testid="value">{context.get()}</p>