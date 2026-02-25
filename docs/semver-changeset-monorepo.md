# Semver with Changeset in a Monorepo

**Using Semantic Versioning 2.0 (SemVer) with Changesets in a Monorepo**

### 1. What the pieces mean

| Concept        | Role in a monorepo                                                                                                                                                                                                                |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **SemVer 2.0** | Defines version numbers as `MAJOR.MINOR.PATCH` (with optional pre‑release/build metadata). <br>_ **MAJOR** – breaking change <br>_ **MINOR** – backward‑compatible feature <br>\* **PATCH** – backward‑compatible bug fix         |
| **Changesets** | Small markdown files (`.md`) that describe what changed and tell the version‑bump tool (e.g., `@changesets/cli`) how to update each affected package. They live alongside the code, usually under a `.changeset/` folder.         |
| **Monorepo**   | One repository containing many inter‑dependent packages (e.g., via Yarn Workspaces, pnpm, or npm workspaces). The version‑bump process runs once for the whole repo, producing consistent releases for all packages that need it. |

### 2. Typical workflow

1. **Make a change** in one or more packages.
2. **Add a changeset** (`yarn changeset` / `pnpm changeset` / `npm exec changeset`). The CLI prompts for:
   - Which packages are affected?
   - What kind of bump (major/minor/patch) each needs?
   - An optional description (used in changelogs).
3. Commit the generated changeset file (e.g., `.changeset/abc123.md`).
4. When you’re ready to release, run the version command (`yarn changeset version` or `pnpm changeset version`). The tool reads all pending changesets, calculates the new versions according to SemVer rules, updates `package.json`s, and writes a consolidated changelog.
5. Publish the updated packages (`yarn changeset publish` …).

### 3. Changeset file format

A changeset is a markdown file with two sections:

`--- "package-a": major "package-b": patch --- Short description of what was done.`

_The YAML front‑matter maps **package names** to the desired bump type._  
The body is free‑form text that ends up in the generated changelog.

### 4. Concrete examples

#### a) **Major bump** – breaking change

``--- "ui-components": major --- Refactored the public API of `Button`. Props `color` and `size` are now required, and the old `variant` prop has been removed. Consumers must update their imports.``

_Result_: `ui-components` version goes from `2.3.4` → `3.0.0`.

#### b) **Minor bump** – backward‑compatible feature

``--- "utils-lib": minor --- Added `formatDate` helper that supports locale‑aware formatting. No existing APIs were altered.``

_Result_: `utils-lib` version goes from `1.5.2` → `1.6.0`.

#### c) **Patch bump** – bug‑fix

`--- "data-fetcher": patch --- Fixed an off‑by‑one error in pagination logic that caused the last page to be omitted.`

_Result_: `data-fetcher` version goes from `0.9.7` → `0.9.8`.

#### d) **No version bump required** – documentation‑only or internal change

If a change does **not** affect the runtime behavior (e.g., README updates, lint rule tweaks), you can still create a changeset but mark the bump as `none`. Some setups also allow omitting the package entry entirely.

`--- "docs": none --- Updated the contribution guide to reflect the new CI workflow.`

_Result_: No version number changes; the changeset is recorded solely for changelog completeness.

_(If your monorepo’s configuration disallows `none`, simply skip creating a changeset for pure docs changes.)_

### 5. Tips for a smooth experience

| Tip                                                                       | Why it helps                                                                                                                                        |
| ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Keep changesets small** – one per logical change.                       | Easier to reason about version impact and to roll back if needed.                                                                                   |
| **Use explicit bump types** – resist “let the tool guess”.                | Guarantees you don’t accidentally ship a breaking change as a minor.                                                                                |
| **Run `changeset status`** before committing.                             | Shows which packages will be bumped and lets you catch accidental omissions.                                                                        |
| **Lock the workspace version** (optional).                                | Some teams enforce a single version for all packages (`--fixed`). Then the highest bump among the changed packages drives the whole repo’s version. |
| **Automate in CI** – e.g., `changeset version && git push --follow-tags`. | Guarantees that every merge that includes a changeset produces a reproducible release.                                                              |

### 6. Quick reference cheat‑sheet

`# Add a new changeset (interactive) yarn changeset          # or pnpm changeset, npm exec changeset # Preview pending bumps yarn changeset status # Apply version bumps and generate changelog yarn changeset version # Publish to npm registry (requires npm token) yarn changeset publish`

**Bottom line:** In a monorepo, Changesets give you a lightweight, source‑controlled way to declare _how_ each package should evolve according to SemVer 2.0. By writing a tiny markdown file per change and letting the CLI compute the new versions, you keep releases predictable, traceable, and aligned across all packages.
