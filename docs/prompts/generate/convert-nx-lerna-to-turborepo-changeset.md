---
# Front‑matter

title: 'Convert NX + Lerna to Turborepo + changeset'
category: workspace
version: 0.0.1
---

# 📄 Overview

Convert this NX + Lerna multi-package, version, publish, deploy to Turborepo with changesets.

> **Goal:** Simplied workspace/library version, build, publish management

# 🧩 Requirements

- All package.json scripts are updated to use turborepo.
- All package.json as necessary use turborepo precomit to format, lint and typecheck.
- changeset is in place across the packages.
- Documentation is provided in /docs explaning:
  - the build pipelie
  - changeset usage
  - An example of the workflow from a code change -> lint, format, typecheck -> build -> test ->
    changeset -> publish.

# 🎯 Scope

- Refer to /docs/monorepo-tooling-recommendations.md for additional recommendation and guidelines.
- Convert NX + Lerna to use Turborepo and changeset.
- Convert the existing Jenskins pipeline to use Turbo repo in a more efficient maner.
- Convert lerna with changeset and add the necessary scripts to package.json.
- Remove husky and lint-stage and use turbo repo in the precommit hook to lint, format, typecheck.

# ✅ Acceptance criteria

1. NX + Lerna are removed.
2. Turnborepo and changeset are in place and working.
3. The requirements and scope have been met.
