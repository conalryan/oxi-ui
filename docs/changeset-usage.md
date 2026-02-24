# Changeset usage

This repo uses [Changesets](https://github.com/changesets/changesets) for **versioning and
publishing** instead of Lerna. Packages are versioned **independently**; each has its own version
and changelog.

## When you change a publishable package

After changing code in a package that is published (e.g. `@akamai/compute-ui-core`,
`@akamai/compute-ui-eslint-config`), add a changeset so the next release knows how to bump the
version and what to put in the changelog.

### 1. Add a changeset

From the repo root:

```bash
pnpm changeset
```

You will be prompted to:

- Select which packages should get a version bump.
- Choose bump type: **patch**, **minor**, or **major** (semver).
- Write a short summary for the changelog.

This creates a new file under `.changeset/` (e.g. `.changeset/brave-dogs-sleep.md`). **Commit that
file** with your change so the release process can consume it.

### 2. Version and publish (CI on `master`)

On the `master` branch, the Jenkins pipeline runs:

1. **`pnpm changeset version`**
   - Reads all changeset files under `.changeset/`.
   - Bumps versions and updates `CHANGELOG.md` for the selected packages.
   - Removes the consumed changeset files.
   - Commits version and changelog updates (if `commit` is enabled in config; currently `false` so
     CI or you must commit).

2. **`pnpm changeset publish`**
   - Publishes to npm only packages whose version was bumped (and that are not in `ignore`).

So the workflow is: **developers add and commit changesets; CI on master runs `changeset version`
and `changeset publish`.**

### 3. Config and ignored packages

- **Config:** `.changeset/config.json`
  - `ignore`: `react-iam`, `react-authentication` (examples are not published).
  - `access`: `"public"` for scoped packages.
  - `baseBranch`: `"master"`.

- **Independent versioning:** `fixed` and `linked` are empty, so each package versions on its own.

### 4. Useful commands

| Command                 | Description                                                  |
| ----------------------- | ------------------------------------------------------------ |
| `pnpm changeset`        | Add a new changeset (interactive).                           |
| `pnpm version`          | Run `changeset version` (bump versions from changesets).     |
| `pnpm publish:packages` | Run `changeset publish` (publish versioned packages to npm). |

See [workflow-example.md](./workflow-example.md) for a full code change → lint/format/typecheck →
build → test → changeset → publish example.
