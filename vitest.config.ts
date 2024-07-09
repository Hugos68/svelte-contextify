import { svelte } from "@sveltejs/vite-plugin-svelte";
import { svelteTesting } from "@testing-library/svelte/vite";
import { defineConfig } from "vitest/config";

const config = defineConfig({
	plugins: [svelte(), svelteTesting()],
	test: {
		include: ["./test/**/*.test.ts"],
		environment: "happy-dom",
	},
});

export default config;
