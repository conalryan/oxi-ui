---
# Front‑matter

title: "Complete Changeset"
category: git
version: 0.0.1
---

# 📄 Overview

Complete a Changeset markdown file using the Jira ticket number, branch name, commit messages and code changes.

> **Goal:** Create a changeset markdown file encompasing the changes.

# 🧩 Requirements

- Read all the commit message from the current branch compared to the origin/develop branch.
- Review the code changes from the current branch compared to the origin/develop branch.

# 🎯 Scope

- All commits (messages, logs, code changes) in the current branch compared to the origin/develop branch.
- List the packages that were changed in the front-matter section.
- Calculate if the change is major, minor, or patch based on [semver-changeset-monorepo](../../dev/semver-changeset-monorepo.md) guidance.
- Write a summary of the changes following [semver-changeset-monorepo](../../dev/semver-changeset-monorepo.md) guidance.
- Prompt the user if you need information to complete the task.
- The file should be named using the branch name following the ([branch naming convention](../../dev/branch-naming-conventions.md)) and/or the commit message ([commit message conventions](../../dev/commit-message-conventions.md)) combined with the latest short git hash e.g. `UIE-1234-some-title-e00b7177.md`.

# ✅ Acceptance criteria

1. A markdown fille placed in the root of the repository in .changeset/ directory.
2. The requirements and scope have been met fully.
