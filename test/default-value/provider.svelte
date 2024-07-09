<script lang="ts">
import type { Context } from "../../src/index.js";
import Consumer from "./consumer.svelte";

const { context, value }: { context: Context<string>; value: string } =
	$props();

context.set(value);
</script>

<Consumer {context} />