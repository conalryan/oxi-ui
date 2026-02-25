# Commit Message Conventions

Below is a practical, battle‑tested cheat‑sheet for writing commit messages that work well for **individual contributors, senior engineers, and whole teams**. It follows the conventions that most open‑source projects and modern CI/CD pipelines expect, and it’s ready to copy‑paste into a `CONTRIBUTING.md` or a team style guide.

## 1. The “Seven‑Box” Conventional Commit Format

```
<type>(<scope>)?: <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

| Part                    | What it looks like                                                                           | When to use it                                        | Why it matters                                                                       |
| ----------------------- | -------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------ |
| **type**                | `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `build`, `ci`, `revert` | Mandatory                                             | Gives automated tools (release notes, changelogs, CI checks) a machine‑readable cue. |
| **scope** _(optional)_  | `ui`, `auth`, `db`, `api`, `cli`, `infra`, `payment`                                         | Enclosed in parentheses, no spaces                    | Shows the subsystem affected; helps reviewers skim a long list of commits.           |
| **subject**             | Capitalized, ≤ 50 characters, imperative mood (`Add login page`, not `Added login page`)     | Mandatory, on the same line as the type               | Short summary that appears in logs, PR titles, and release notes.                    |
| **body** _(optional)_   | Wrapped at 72 chars, explains **what** and **why** (not how)                                 | Use when the change isn’t self‑explanatory            | Gives future readers context, rationales, and any trade‑offs.                        |
| **footer** _(optional)_ | `BREAKING CHANGE: <description>` or `Closes #123`, `Refs #456`                               | Use for breaking changes or linking to issue trackers | Enables automatic issue closing and signals version bumps.                           |

### Example

```
feat(auth): Add OAuth2 login flow

Implement the Authorization Code Grant with PKCE for Google and GitHub.
The UI now shows a “Login with …” button on the sign‑in page.

Closes #342
```

## 2. Why the Imperative Mood?

- Git logs read like a series of commands: **“Add feature X”, “Fix bug Y”.**
- Tools such as `git log --oneline` and generated changelogs become readable sentences.
- Consistency across the team reduces cognitive load when scanning history.

## 3. Length Guidelines

| Section    | Max characters                                             |
| ---------- | ---------------------------------------------------------- |
| Subject    | 50 (including type/scope)                                  |
| Body lines | 72 (wrapped)                                               |
| Footer     | No hard limit, but keep it concise (usually a single line) |

If the subject exceeds 50 chars, split the extra detail into the body.

## 4. Types Explained (the most common ones)

| Type       | Typical use                                                   | Effect on versioning (if you follow SemVer)                 |
| ---------- | ------------------------------------------------------------- | ----------------------------------------------------------- |
| `feat`     | New user‑visible functionality                                | **Minor** bump                                              |
| `fix`      | Bug fix that does not change public API                       | **Patch** bump                                              |
| `perf`     | Performance improvement (no new feature)                      | **Patch** (or **Minor** if it adds a measurable capability) |
| `refactor` | Code restructure without functional change                    | No version bump                                             |
| `style`    | Whitespace, formatting, missing semicolons                    | No version bump                                             |
| `docs`     | Documentation only changes                                    | No version bump                                             |
| `test`     | Adding or fixing tests                                        | No version bump                                             |
| `chore`    | Build scripts, CI config, dependency upgrades                 | No version bump                                             |
| `build`    | Changes that affect the build system or external dependencies | No version bump                                             |
| `ci`       | CI pipeline configuration changes                             | No version bump                                             |
| `revert`   | Reverts a previous commit (include original SHA)              | Mirrors the original commit’s type                          |

## 5. Linking Commits to Issues / PRs

- **GitHub / GitLab**: `Closes #123`, `Fixes #456`, `Resolves #789` automatically close the referenced issue when the commit lands on the default branch.
- **Multiple issues**: `Closes #12, #34, #56`.
- **Cross‑repo references**: `Closes org/repo#99`.

If you don’t want the issue closed automatically, use `Refs #123` instead.

## 6. Breaking Changes

When a commit introduces a **breaking change** (API change, DB schema alteration, config format change, etc.):

1. Add a `BREAKING CHANGE:` line in the **footer** (or start the body with it if you have no footer).
2. Describe **what** broke and **how** to migrate.

```
feat(api): Switch to v2 endpoint

The client now calls /v2/users instead of /v1/users.
All callers must update request payloads accordingly.

BREAKING CHANGE: The response format changed from {id, name}
to {userId, fullName}. Update consuming code.
```

Automated changelog generators (e.g., `standard-version`, `semantic-release`) will bump the major version.

## 7. Practical Tips for Senior Engineers & Reviewers

| Situation                                                 | Recommended commit style                                                                                                              |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Large refactor** (multiple files, no functional change) | One `refactor(scope): …` commit with a clear body explaining the motivation (e.g., “Extract common utilities to reduce duplication”). |
| **Bug fix + small doc tweak**                             | Split into two commits: `fix(scope): …` and `docs(scope): …`. Keeps `git bisect` clean.                                               |
| **Feature flag rollout**                                  | `feat(flag): Add experimental X flag` – later, when flag is removed, use `revert(feat): Remove experimental X flag`.                  |
| **Dependency upgrade**                                    | `chore(deps): Upgrade lodash to 4.17.21` – include a note about any required code changes.                                            |
| **Hotfix on production**                                  | `hotfix(scope): …` (some teams add a dedicated `hotfix` type) and **rebase** onto the latest `main` before merging.                   |
| **Reverting a bad commit**                                | `revert: <original subject>` with the original SHA in the body: `This reverts commit abc1234…`.                                       |

## 8. Enforcing the Convention

| Tool                                                       | How it helps                                                          |
| ---------------------------------------------------------- | --------------------------------------------------------------------- |
| **Commitlint** (`@commitlint/config-conventional`)         | Lints `git commit` messages locally (pre‑commit hook).                |
| **husky** + **lint-staged**                                | Runs `commitlint` automatically before `git commit`.                  |
| **Semantic Release**                                       | Generates changelogs and bumps versions based purely on commit types. |
| **GitHub Actions** (e.g., `actionlint` or custom script)   | Fails CI if a PR contains non‑conforming commits.                     |
| **IDE plugins** (VS Code “Conventional Commits” extension) | Provides a UI picker for type/scope and enforces length limits.       |

## 9. Sample `commitlint` Configuration (copy‑paste)

`// commitlint.config.js module.exports = {   extends: ['@commitlint/config-conventional'],  rules: {    // enforce 50‑char limit on subject line    'header-max-length': [2, 'always', 50],    // allow optional scope    'scope-empty': [2, 'never'],    // require a body for feat/fix/perf    'body-min-length': [1, 'always', 20],  }, };`

Add a pre‑commit hook with Husky:

`npm install --save-dev husky @commitlint/cli npx husky install npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'`

Now every `git commit` is validated automatically.

## 10. Quick Reference Table (Copy‑Paste)

| Type       | Scope (optional) | Subject (≤ 50)                   | Body (≥ 20, wrap 72)                               | Footer        |
| ---------- | ---------------- | -------------------------------- | -------------------------------------------------- | ------------- |
| `feat`     | `auth`           | Add OAuth2 login                 | Explain flow, UI changes, security considerations. | `Closes #123` |
| `fix`      | `api`            | Fix NPE in user serializer       | Detail root cause and why the fix works.           | `Refs #456`   |
| `docs`     | `readme`         | Update installation steps        | Mention new OS requirements.                       | —             |
| `refactor` | `utils`          | Simplify date helper             | Show before/after, no behavioural change.          | —             |
| `perf`     | `query`          | Speed up order lookup            | Added index on `order_date`.                       | —             |
| `test`     | `payment`        | Add integration test for refunds | Covers edge‑case when amount = 0.                  | —             |
| `chore`    | `deps`           | Bump axios to 1.4.0              | No breaking API change                             |               |
