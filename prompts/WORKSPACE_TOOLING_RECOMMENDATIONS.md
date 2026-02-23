# Monorepo Tooling Comparison for Bun + Vite + OXC Stack

## Executive Summary

This document compares monorepo orchestration and versioning tools for a modern front-end library monorepo using **Bun + Vite + OXC**. The workspace includes:

- Theme library with design tokens and CSS variables
- Core TypeScript library (utilities, authentication, permissions, feature flags)
- Web component library (Lit) with React and Angular wrappers

---

## Tool Categories

### Monorepo Orchestration
- **Lerna + Nx** - Classic publishing workflow with modern caching
- **Turborepo** - Lightweight, fast task orchestration
- **Nx (standalone)** - Feature-rich enterprise solution

### Versioning & Publishing
- **Changesets** - Independent versioning with changelogs
- **Lerna** - Conventional commits and automated publishing
- **Nx Release** - Integrated versioning within Nx

---

## Option 1: Turborepo + Changesets

**Overview**: Lightweight orchestration with independent versioning. This is the current stack used in the workspace.

| Feature | Rating | Details |
|---------|--------|---------|
| **Caching** | ⭐⭐⭐⭐⭐ | Local + Vercel Remote Cache, content-addressable |
| **Parallel Execution** | ⭐⭐⭐⭐⭐ | Excellent parallel task execution with topological ordering |
| **Affected Detection** | ⭐⭐⭐ | Filter-based (`--filter`), no built-in affected command |
| **Publishing** | ⭐⭐⭐⭐⭐ | Changesets handles selective publishing beautifully |
| **Versioning** | ⭐⭐⭐⭐⭐ | Independent mode, automatic changelogs |

### Caching

```bash
# Local caching enabled by default
turbo build

# Remote caching with Vercel
turbo login
turbo link
```

- **Local cache**: `.turbo/cache/` directory
- **Remote cache**: Vercel Remote Cache (free tier: 10GB)
- **Cache invalidation**: Based on inputs (source files, config, dependencies)

### Parallel Execution

```json
// turbo.json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],  // Waits for dependencies
      "outputs": ["dist/**"]
    },
    "lint": {
      "outputs": []  // Runs in parallel, no dependencies
    }
  }
}
```

### Affected Change Detection

```bash
# Filter by changed packages (requires git)
turbo build --filter='[HEAD^1]'

# Filter by specific package and dependencies
turbo build --filter=@oxi-ui/web-components...
```

**Limitation**: No built-in `--affected` flag like Nx; requires filter syntax.

### Publishing & Versioning (Changesets)

```bash
# Add a changeset (during development)
bun changeset

# Version packages (bumps versions, generates changelogs)
bun changeset version

# Publish to npm
bun changeset publish
```

**Changeset Features**:
- Independent versioning per package
- Automatic CHANGELOG.md generation
- Pre-release support (`--pre`)
- Monorepo-aware: only publishes changed packages

### Pros

- ✅ **Minimal configuration** - Simple `turbo.json`
- ✅ **Extremely fast** - Go-based, optimized for speed
- ✅ **Bun-native** - Works seamlessly with Bun workspaces
- ✅ **Changesets maturity** - Battle-tested versioning solution
- ✅ **No vendor lock-in** - Works with any package manager
- ✅ **Excellent DX** - Clear error messages, simple mental model

### Cons

- ❌ **Limited affected detection** - Filter syntax less intuitive than Nx
- ❌ **No generators** - Must create boilerplate manually or use external tools
- ❌ **Two tools to manage** - Turborepo + Changesets are separate
- ❌ **No dependency graph visualization** - Unlike Nx's graph explorer

---

## Option 2: Lerna + Nx

**Overview**: Lerna provides mature publishing workflows, Nx provides caching and orchestration. Since Lerna v6+, Nx is the default task runner.

| Feature | Rating | Details |
|---------|--------|---------|
| **Caching** | ⭐⭐⭐⭐⭐ | Nx local + Nx Cloud remote caching |
| **Parallel Execution** | ⭐⭐⭐⭐⭐ | Nx's sophisticated task scheduler |
| **Affected Detection** | ⭐⭐⭐⭐⭐ | First-class `--affected` flag with project graph |
| **Publishing** | ⭐⭐⭐⭐⭐ | Lerna's mature conventional commits workflow |
| **Versioning** | ⭐⭐⭐⭐⭐ | Independent or fixed modes |

### Configuration

```json
// lerna.json
{
  "version": "independent",
  "npmClient": "bun",
  "useNx": true,
  "command": {
    "publish": {
      "conventionalCommits": true,
      "message": "chore(release): publish"
    },
    "version": {
      "conventionalCommits": true,
      "createRelease": "github"
    }
  }
}
```

```json
// nx.json
{
  "targetDefaults": {
    "build": {
      "dependsOn": ["^build"],
      "cache": true
    },
    "test": {
      "cache": true
    }
  },
  "namedInputs": {
    "default": ["{projectRoot}/**/*"],
    "production": ["default", "!{projectRoot}/**/*.test.ts"]
  }
}
```

### Caching

```bash
# Local caching (automatic)
npx nx build @oxi-ui/core

# Remote caching with Nx Cloud
npx nx connect
```

- **Computation caching**: Caches task outputs based on inputs
- **Distributed caching**: Nx Cloud (free for open source)
- **Fine-grained inputs**: Named inputs for precise cache invalidation

### Parallel Execution

```bash
# Run all builds in parallel (respecting dependencies)
npx nx run-many -t build

# Parallel with concurrency limit
npx nx run-many -t build --parallel=4
```

### Affected Change Detection

```bash
# Only build affected packages
npx nx affected -t build

# Affected since specific commit
npx nx affected -t build --base=main --head=HEAD

# Visualize affected graph
npx nx affected:graph
```

### Publishing & Versioning (Lerna)

```bash
# Version with conventional commits
npx lerna version --conventional-commits

# Publish changed packages
npx lerna publish from-package

# Full release workflow
npx lerna version && npx lerna publish from-git
```

**Lerna Features**:
- `--conventional-commits` for automated changelog generation
- `--create-release github` for GitHub releases
- `--independent` for per-package semver
- Canary releases with `--canary`

### Pros

- ✅ **Best affected detection** - Project graph with visualization
- ✅ **Mature publishing** - Lerna's battle-tested workflow
- ✅ **Conventional commits** - Automated version bumping
- ✅ **GitHub releases** - Built-in integration
- ✅ **Generators available** - Nx generators for scaffolding
- ✅ **Enterprise support** - Nx Cloud for teams

### Cons

- ❌ **Heavier setup** - Two config files (lerna.json + nx.json)
- ❌ **Bun compatibility** - Some Nx plugins assume npm/pnpm/yarn
- ❌ **Learning curve** - Nx concepts (targets, executors, generators)
- ❌ **Lerna owned by Nx** - Overlap between tools can be confusing
- ❌ **Plugin ecosystem** - Many plugins not designed for Bun

---

## Option 3: Nx (Standalone with Nx Release)

**Overview**: Full Nx adoption with built-in versioning via Nx Release (introduced in Nx 17+).

| Feature | Rating | Details |
|---------|--------|---------|
| **Caching** | ⭐⭐⭐⭐⭐ | Best-in-class local + remote caching |
| **Parallel Execution** | ⭐⭐⭐⭐⭐ | Sophisticated task scheduling |
| **Affected Detection** | ⭐⭐⭐⭐⭐ | First-class support with project graph |
| **Publishing** | ⭐⭐⭐⭐ | Nx Release (newer, maturing) |
| **Versioning** | ⭐⭐⭐⭐ | Independent versioning support |

### Configuration

```json
// nx.json
{
  "release": {
    "projects": ["packages/*"],
    "version": {
      "conventionalCommits": true
    },
    "changelog": {
      "workspaceChangelog": {
        "createRelease": "github"
      },
      "projectChangelogs": true
    }
  }
}
```

### Caching & Execution

Same as Lerna + Nx option - uses Nx's caching infrastructure.

### Publishing & Versioning (Nx Release)

```bash
# Version packages based on conventional commits
npx nx release version

# Generate changelogs
npx nx release changelog

# Publish to npm
npx nx release publish

# Full release (version + changelog + publish)
npx nx release
```

### Pros

- ✅ **Single tool** - No separate versioning tool needed
- ✅ **Integrated experience** - Versioning built into Nx workflow
- ✅ **Conventional commits** - Automated version determination
- ✅ **GitHub releases** - Built-in support
- ✅ **Full Nx features** - Generators, graph, affected

### Cons

- ❌ **Nx Release is newer** - Less battle-tested than Changesets/Lerna
- ❌ **Full Nx adoption** - Requires Nx project structure
- ❌ **Bun compatibility** - Some features assume Node.js tooling
- ❌ **Heavier footprint** - More dependencies and configuration
- ❌ **Vendor dependency** - Deeper lock-in to Nx ecosystem

---

## Option 4: Turborepo + Lerna (Hybrid)

**Overview**: Use Turborepo for caching/orchestration, Lerna only for versioning/publishing.

| Feature | Rating | Details |
|---------|--------|---------|
| **Caching** | ⭐⭐⭐⭐⭐ | Turborepo's excellent caching |
| **Parallel Execution** | ⭐⭐⭐⭐⭐ | Turborepo task scheduling |
| **Affected Detection** | ⭐⭐⭐ | Filter-based (Turborepo) |
| **Publishing** | ⭐⭐⭐⭐⭐ | Lerna's mature workflow |
| **Versioning** | ⭐⭐⭐⭐⭐ | Lerna conventional commits |

### Configuration

```json
// lerna.json
{
  "version": "independent",
  "npmClient": "bun",
  "useNx": false,  // Use Turborepo instead
  "command": {
    "publish": {
      "conventionalCommits": true
    }
  }
}
```

### Pros

- ✅ **Best of both** - Turborepo speed + Lerna publishing
- ✅ **Simpler than Nx** - Turborepo is lighter weight
- ✅ **Conventional commits** - Automated changelogs
- ✅ **GitHub releases** - Lerna integration

### Cons

- ❌ **Two tools** - Separate orchestration and versioning
- ❌ **Limited affected** - No first-class affected detection
- ❌ **Configuration overlap** - Some concepts duplicate

---

## Comparison Matrix

| Feature | Turbo + Changesets | Lerna + Nx | Nx Standalone | Turbo + Lerna |
|---------|-------------------|------------|---------------|---------------|
| **Setup Complexity** | Low | Medium-High | Medium | Medium |
| **Bun Compatibility** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Local Caching** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Remote Caching** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Affected Detection** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Parallel Execution** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Independent Versioning** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Changelog Generation** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Publishing Workflow** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Generators/Scaffolding** | ❌ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ❌ |
| **Graph Visualization** | ❌ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ❌ |
| **Maintenance Burden** | Low | High | Medium | Medium |
| **Community/Docs** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |

---

## Final Recommendation

### **Recommended: Turborepo + Changesets** ✅

For a **Bun + Vite + OXC** monorepo, **Turborepo + Changesets** is the optimal choice:

| Aspect | Rationale |
|--------|-----------|
| **Bun Compatibility** | Turborepo works natively with Bun workspaces |
| **Simplicity** | Minimal configuration, clear mental model |
| **Changesets Maturity** | Battle-tested in major projects (React, Radix, etc.) |
| **Performance** | Turborepo's Go-based caching is extremely fast |
| **Independence** | No vendor lock-in, can migrate to Nx later if needed |
| **OXC Alignment** | Both tools favor simplicity and performance |

### Current Workspace Status

The workspace **already uses Turborepo + Changesets**, which is the recommended configuration:

```json
// package.json (current)
{
  "scripts": {
    "build": "turbo build",
    "changeset": "changeset",
    "release": "changeset version && turbo build && changeset publish"
  },
  "devDependencies": {
    "@changesets/cli": "2.29.8",
    "turbo": "^2.0.0"
  }
}
```

### When to Consider Alternatives

| Scenario | Recommendation |
|----------|----------------|
| Need sophisticated affected detection | Consider Lerna + Nx |
| Want generators for scaffolding | Consider Nx standalone |
| Prefer conventional commits over manual changesets | Consider Lerna |
| Need distributed task execution | Consider Nx Cloud |

### Recommended Enhancements

1. **Enable Vercel Remote Cache** (optional):
   ```bash
   bunx turbo login
   bunx turbo link
   ```

2. **Add prerelease support**:
   ```bash
   bun changeset pre enter beta
   bun changeset version
   bun changeset publish
   bun changeset pre exit
   ```

3. **CI Integration**:
   ```yaml
   # .github/workflows/release.yml
   - name: Create Release PR or Publish
     uses: changesets/action@v1
     with:
       publish: bun run release
     env:
       GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
       NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
   ```

---

## References

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Changesets Documentation](https://github.com/changesets/changesets)
- [Nx Documentation](https://nx.dev)
- [Lerna Documentation](https://lerna.js.org)
- [Bun Workspaces](https://bun.sh/docs/install/workspaces)
