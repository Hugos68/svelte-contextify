import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import { createContext } from "../../src/index.js";
import Consumer from "./consumer.svelte";
import Provider from "./provider.svelte";

describe("defaultValue", () => {
	it("returns the set value if the context is already set when calling get", () => {
		const value = "foo";
		const context = createContext({ defaultValue: "bar" });
		const { getByTestId } = render(Provider, {
			props: {
				context,
				value,
			},
		});

		expect(getByTestId("value").textContent).toBe(value);
	});

	it("returns the defaultValue if the context is not set when calling get", () => {
		const defaultValue = "bar";
		const context = createContext({ defaultValue });
		const { getByTestId } = render(Consumer, {
			props: {
				context,
			},
		});

		expect(getByTestId("value").textContent).toBe(defaultValue);
	});
});
