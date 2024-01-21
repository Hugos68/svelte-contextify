# svelte-contextify

## 0.2.0

### Minor Changes

- c781eb8: Breaking: Revamped the API, instead of having multiple parameters and an array as return value it now accepts and returns an object.
- c781eb8: Added `onError` parameter that will be called when context is trying to be retrieved when it hasn't been set (#18).
- c781eb8: Added `has` function to the returned value to make it easier to check if context exists.

## 0.1.3

### Patch Changes

- b7446d5: Fixed types

## 0.1.2

### Patch Changes

- 132ce75: Minor doc typo

## 0.3.0

### Minor Changes

- 2eb5fe8: Removed key (replaced with symbol, thanks coka), added fallback parameter when get returns undefined
- 23a1655: Added symbol to prevent duplicate context (thanks Coka)

### Patch Changes

- 23a1655: Removed warning for duplicate keys (impossible because of new symboled keys)

## 0.2.1

### Patch Changes

- 9f8af68: doc typo

## 0.2.0

### Minor Changes

- eedbf4f: Added warning when using duplicate keys, better docs

### Patch Changes

- e5596a2: Docs improvement

## 0.1.1

### Patch Changes

- 50bce24: Better documentation with type example

## 0.1.0

### Minor Changes

- 0f28f85: Released library
