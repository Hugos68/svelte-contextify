import { render } from '@testing-library/svelte';
import { expect, test } from 'vitest';
import Parent from './Parent.svelte';

test('', () => {
	const parent = render(Parent);

	expect(parent.getByTestId('context-without-options'));
});
