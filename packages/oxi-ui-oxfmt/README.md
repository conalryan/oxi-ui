# @akamai/compute-ui-oxfmt

Oxfmt configuration for Compute UI projects, matching the Prettier settings from the eslint-config
package. Use with [Oxfmt](https://oxc.rs/docs/guide/usage/formatter/) for fast formatting.

## Installation

```bash
pnpm add -D oxfmt @akamai/compute-ui-oxfmt
```

A **postinstall** script runs after install and creates `.oxfmtrc.json` in your project root if it
does not already exist. Existing config is never overwritten.

## Usage

### Use in your project

If you just installed the package, `.oxfmtrc.json` was likely created for you. You can edit it as
needed. Oxfmt does not support `extends`; the postinstall copies this package’s options into your
project. Manual setup: create `.oxfmtrc.json` (or `.oxfmtrc.jsonc`) in your project root with
options like:

```json
{
  "$schema": "./node_modules/oxfmt/configuration_schema.json",
  "printWidth": 100,
  "singleQuote": true,
  "bracketSameLine": true,
  "singleAttributePerLine": true,
  "ignorePatterns": ["build", "coverage", "dist", "node_modules"]
}
```

### Migrate from Prettier

You can also run Oxfmt’s Prettier migration and then align with this config:

```bash
npx oxfmt --migrate=prettier
```

### Scripts

```json
{
  "scripts": {
    "format": "oxfmt",
    "format:check": "oxfmt --check"
  }
}
```

## Options (vs Prettier defaults)

Only options that differ from Oxfmt’s defaults are set:

| Option                   | Value                               | Note                                        |
| ------------------------ | ----------------------------------- | ------------------------------------------- |
| `printWidth`             | 100                                 | Same as Oxfmt default; set for clarity.     |
| `singleQuote`            | true                                | Use single quotes.                          |
| `bracketSameLine`        | true                                | Put `>` of multi-line JSX on the last line. |
| `singleAttributePerLine` | true                                | One attribute per line in JSX/HTML.         |
| `ignorePatterns`         | build, coverage, dist, node_modules | Replaces `.prettierignore`.                 |

## Lint + format together

Use with `@akamai/compute-ui-oxlint` for linting. Lint and format are separate packages so you can
adopt Oxlint, Oxfmt, or both.
