# Prompt: Bun + Vite + OXC Frontend Monorepo

## Input

Create a frontend monorepo using Bun + Vite + OXC.
The packages to include are

1. a "core" typescript library that contains common utility functions, authenticaiton, feature-flags, and permission checks.
   - The library should have minium 90% code coverage and have minification and production ready performance.
   - The outputs should be tree shakable to avoid importing the entire library.
2. a "web-components" typescript library using Lit.
   - The library will contain the necessary React wrappers along with the lit web components.
   - The library will contain the necessary Angular wrappers along with the lit web components.
   - The user can import the web components or the React wrapper or the Angular wrappers.
   - the components should have a minim 90% code coverage and have minifications and production ready perfomrnace.

The packages need to be independently versionsed, build, tested and published.
There needs caching so only the necessary task are run e.g. only build a single component rather than all packages.
Task should run in parallel and dependent task run as required.

Create a Dockerfile with bun so that any develop can run the packages via Docker.

Create a .vscode devcontainer using the Dockerfile.

Create a Jenkinspipeline using the Dockerfile to build, test, lint, and publish the packages.

Only the packages that have changes should be built, tested, linted and published.

Each package will have an indepent semver.

## Output

Create the monorepo workspace at the root of this repository.

A single function example with a test should be added to

- /packages/core/src/authentication/isAuthorized.ts
- /packages/core/src/feature-flags/isEnabled.ts

a single web-component example should be added to

- /packages/web-components/button/button.element.ts
- /packages/web-components/text-field/text-field.element.ts

There should be unit tests and the necessary wrappers for React and Angular.
