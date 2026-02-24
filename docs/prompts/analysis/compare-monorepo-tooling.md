# Prompt: Compare monorepo tooling

## Input

Compared the lastest monorepo tooling for a modern front-end libraries.
Compare the tools/libraries in terms of: caching, parallel execution, affected change detection, publishing, versioning, and any other relavant information.
Several libraries can be combined as necessary.
Examples include:

- Lerna + NX
- TurboRepo + changesets
- other libraries...

The libraries are using Bun + Vite + OXC.
It includes:

- theme library with design tokens and css variables.
- core typescript library with common utility functions, authentication, permission checks, feature flags, etc.
- web-component library written in Lit with React and Angular wrappers.
- additional libraries and applications will be added once the foundational libraries are established.

## Output

Create a mardown file summarizing the pros and cons of each library + any other libraries tooling you recommned.
You should give a final recommendation based on the findings.
Create the markdown file path and name is /prompts/WORKSPACE_RECOMMENDATIONS.md
