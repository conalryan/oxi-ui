# @akamai/compute-ui-oxlint

Oxlint configuration for Compute UI projects, converted from `@akamai/compute-ui-eslint`. Use this
for fast, ESLint-compatible linting with Oxlint.

## Installation

```bash
pnpm add -D oxlint @akamai/compute-ui-oxlint
```

## Usage

### Full React config (recommended)

In your project root, create `.oxlintrc.json` that extends the React config:

```json
{
  "extends": ["./node_modules/@akamai/compute-ui-oxlint/lib/oxlintrc.react.json"]
}
```

Or use the default export (same as React config):

```json
{
  "extends": ["./node_modules/@akamai/compute-ui-oxlint/lib/oxlintrc.json"]
}
```

### Extend specific layers

```json
{
  "extends": [
    "./node_modules/@akamai/compute-ui-oxlint/lib/oxlintrc.ignores.json",
    "./node_modules/@akamai/compute-ui-oxlint/lib/oxlintrc.base.json",
    "./node_modules/@akamai/compute-ui-oxlint/lib/oxlintrc.react.json"
  ]
}
```

### Run Oxlint

```bash
npx oxlint .
```

Add to `package.json`:

```json
{
  "scripts": {
    "lint": "oxlint .",
    "lint:fix": "oxlint . --fix"
  }
}
```

## Exports

| Export    | File                      | Description                                    |
| --------- | ------------------------- | ---------------------------------------------- |
| `.`       | `lib/oxlintrc.json`       | Full config (same as React)                    |
| `./react` | `lib/oxlintrc.react.json` | TypeScript + React + jsx-a11y + base overrides |

## Relationship to ESLint config

This package is the Oxlint equivalent of `@akamai/compute-ui-eslint`. Not all ESLint rules from that
config are implemented in Oxlint; the migrated config enables every rule that Oxlint supports. You
can run Oxlint and ESLint together (e.g. `oxlint . && eslint .`) or migrate fully to Oxlint.

## Formatting

For formatting, use `@akamai/compute-ui-oxfmt` (Prettier-equivalent options for Oxfmt).
