# Branch Naming Conventions

Here’s a quick‑reference guide to the naming conventions you’ll see most often when teams organize their Git branches. The goal of any convention is to make it obvious at a glance **what the purpose of the branch is**, **where it fits in the workflow**, and **how it relates to work‑tracking tools** (Jira, Azure DevOps, GitHub Issues, etc.).

## 1. High‑level workflow families

| Workflow                                           | Typical Prefixes                                                          | When it shines                                                                         |
| -------------------------------------------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **Git‑Flow** (long‑lived `develop` & `master`)     | `feature/`, `release/`, `hotfix/`, `support/`                             | Projects with scheduled releases, many parallel feature streams.                       |
| **GitHub Flow** (single “main” line)               | `feature/`, `bugfix/`, `chore/` (optional)                                | Continuous‑delivery / trunk‑based environments where every PR goes straight to `main`. |
| **Trunk‑Based Development** (short‑lived branches) | `feat/`, `fix/`, `doc/`, `test/` (often just short‑lived feature toggles) | Teams that merge multiple times per day; branches live only a few hours.               |
| **Release‑Train / Version‑Branch**                 | `release/vX.Y`, `maintenance/vX.Y`                                        | Regulated release cadence (e.g., quarterly) with maintenance patches.                  |

> **Tip:** Pick one workflow and stick to its prefix set across the whole repo. Mixing styles quickly becomes confusing.

## 2. Common prefix taxonomy

| Prefix     | Meaning                                                                               | Typical pattern (with ticket ID)        |
| ---------- | ------------------------------------------------------------------------------------- | --------------------------------------- |
| `feature/` | New user‑facing or internal functionality                                             | `feature/JIRA‑123-add‑login‑page`       |
| `bugfix/`  | Fix for a defect reported in the tracker                                              | `bugfix/BUG‑456-fix‑null‑pointer`       |
| `hotfix/`  | Emergency fix that must go straight to production (often branched from `master/main`) | `hotfix/PROD‑789-patch‑payment‑timeout` |
| `release/` | Preparation for a versioned release (branch off `develop` or `main`)                  | `release/1.4.0`                         |
| `support/` | Maintenance of an older released line (e.g., LTS)                                     | `support/2.x`                           |
| `chore/`   | Non‑functional work (build scripts, CI config)                                        | `chore/update‑docker‑base`              |
| `doc/`     | Documentation‑only changes                                                            | `doc/add‑api‑usage‑guide`               |
| `test/`    | Test‑only additions or refactors                                                      | `test/improve‑integration‑suite`        |

_You can shorten the prefixes (`feat/`, `fix/`, `hot/`) if the team prefers brevity._

## 3. Structural elements of a branch name

A well‑structured name usually contains three parts, separated by a consistent delimiter (most teams use `/` for the prefix and `-` for the rest):

```
<prefix>/<ticket-id>-<short-descriptive-kebab-case>
```

| Element              | Why it matters                                                                                                                                      |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Prefix**           | Signals the branch’s purpose to anyone scanning the repo.                                                                                           |
| **Ticket ID**        | Provides a direct link to the issue/requirement in the tracker. Many CI systems can auto‑populate the PR description from this ID.                  |
| **Descriptive slug** | Human‑readable hint of the change; keep it ≤ 3–5 words, all lower‑case, hyphen‑separated. Avoid spaces, special characters, or overly long strings. |

**Examples**

```
feature/PROJ-1010-add-search-bar
bugfix/BUG-42-fix-crash-on-startup
hotfix/PROD-7-fix-payment-timeout
release/2.3.0
chore/CI-update-node-version
doc/README-add-contributing-section
```

## 4. Naming rules to enforce consistency

| Rule                                                                         | Rationale                                                                          |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| **Lower‑case only** (except ticket IDs which are often upper‑case)           | Prevents case‑sensitivity headaches on Windows/macOS filesystems.                  |
| **Use hyphens (`-`)** as word separators                                     | Improves readability and works well with most CI tooling.                          |
| **Avoid special characters** (`! @ # $ % ^ & * ( )`)                         | They can break shell scripts or URL encoding.                                      |
| **Keep total length < 80 chars**                                             | Some CI systems truncate very long refs; shorter names are easier to read in logs. |
| **Never embed spaces**                                                       | Git treats spaces as part of the ref name, leading to quoting issues.              |
| **Do not start with a number** (unless the prefix itself ends with a number) | Some tools interpret a leading digit as a version tag.                             |
| **Optional: Include “scope”** (e.g., `feature/ui/login-page`)                | Helpful for large monorepos where many subsystems coexist.                         |

## 5. Branch‑to‑PR workflow checklist

1. **Create branch** from the correct base (`main`, `develop`, or the current release branch).

   `git checkout develop          # or main git pull --rebase git checkout -b feature/JIRA-123-add-login-page`

2. **Commit early, commit often** – each commit message should also reference the ticket ID.
3. **Push** to remote (creates the remote ref automatically).

   `git push -u origin feature/JIRA-123-add-login-page`

4. **Open a Pull Request** – most platforms auto‑fill the title with the branch name; edit if needed.
5. **Merge strategy** – typically “Squash and merge” for feature branches, “Rebase and merge” for hotfixes, depending on team policy.

## 6. Variations you might encounter

| Variation                     | When it appears                                                   | Example                                    |
| ----------------------------- | ----------------------------------------------------------------- | ------------------------------------------ |
| **`rc/`** (release candidate) | Pre‑release testing before a final tag                            | `rc/1.5.0-rc1`                             |
| **`sp/`** (service pack)      | Long‑term support branches                                        | `sp/2.0.0`                                 |
| **`exp/`** (experimental)     | Throw‑away prototypes, not intended for production                | `exp/new‑graph‑engine`                     |
| **`refactor/`**               | Large structural changes without functional impact                | `refactor/module‑loader-cleanup`           |
| **`task/`**                   | Generic work that doesn’t fit other categories (e.g., “research”) | `task/PROJ-200-investigate‑cache‑strategy` |

These are optional; adopt only if they solve a real pain point.

## 7. Quick cheat‑sheet (copy‑paste)

`# Feature feature/<TICKET>-<kebab-case-description> # Bug fix bugfix/<TICKET>-<kebab-case-description> # Hotfix (emergency) hotfix/<TICKET>-<kebab-case-description> # Release preparation release/<VERSION> # Maintenance of old line support/<MAJOR>.x # Chores / non‑code chore/<kebab-case-description> doc/<kebab-case-description> test/<kebab-case-description>`

### TL;DR

1. **Pick a workflow** (Git‑Flow, GitHub Flow, trunk‑based).
2. **Standardize prefixes** (`feature/`, `bugfix/`, `hotfix/`, `release/`, …).
3. **Structure names** as `<prefix>/<ticket-id>-<short‑slug>` using lower‑case and hyphens.
4. **Enforce simple rules** (no spaces, max ~80 chars, consistent delimiters).
5. **Document the convention** in a `CONTRIBUTING.md` so every contributor can follow it.

Following these conventions keeps the repository tidy, makes CI/CD pipelines smoother, and lets anyone glance at a branch name and instantly understand its purpose. Happy branching!
