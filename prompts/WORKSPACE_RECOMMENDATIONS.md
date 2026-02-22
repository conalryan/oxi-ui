# Front-End Monorepo Build Tool Recommendations

## Executive Summary

This document evaluates the top 3 build tooling options for a production-grade, framework-agnostic front-end monorepo containing:
- A Lit component library with React/Angular wrappers
- A "portal" wrapper component (header, footer, side-menu)
- ESLint configuration package
- Core TypeScript utilities (auth, analytics, permissions, feature flags)

---

## Top 3 Options

### Option 1: Nx + Vite + esbuild

**Overview**: Nx provides monorepo orchestration with intelligent caching, while Vite handles development and esbuild powers production builds.

| Category | Details |
|----------|---------|
| **Build Tooling** | Nx for orchestration, Vite for dev server, esbuild/Rollup for production |
| **Caching** | Nx Cloud remote caching, local computation caching, affected-only builds |
| **Minification** | esbuild (extremely fast) or terser (more optimized) |
| **Performance** | Excellent - sub-second HMR, parallel task execution |
| **Monorepo Support** | First-class - dependency graph, generators, executors |
| **Modern Tooling** | Native ESM, TypeScript 5.x, modern browser targets |

**Pros**:
- ✅ Best-in-class caching with Nx Cloud (free tier available)
- ✅ Intelligent affected detection - only rebuilds changed packages
- ✅ Built-in generators for Lit, React, Angular packages
- ✅ Excellent dependency graph visualization
- ✅ Strong community and enterprise support
- ✅ Native support for publishable libraries
- ✅ Task pipelines ensure correct build order
- ✅ Vite's native Lit support is excellent

**Cons**:
- ❌ Steeper learning curve for Nx concepts
- ❌ Additional configuration complexity
- ❌ Nx Cloud required for remote caching (team environments)
- ❌ Can feel "heavy" for smaller projects

**Ideal For**: Teams needing enterprise-grade tooling with maximum caching efficiency.

---

### Option 2: Turborepo + Vite + esbuild

**Overview**: Turborepo provides lightweight monorepo task orchestration with powerful caching, paired with Vite for development.

| Category | Details |
|----------|---------|
| **Build Tooling** | Turborepo for orchestration, Vite for dev/build |
| **Caching** | Local + Vercel Remote Cache, content-addressable |
| **Minification** | esbuild (default) or terser via Vite config |
| **Performance** | Excellent - incremental builds, parallel execution |
| **Monorepo Support** | Good - task pipelines, workspace dependencies |
| **Modern Tooling** | Native ESM, modern TypeScript support |

**Pros**:
- ✅ Zero-config to start, minimal learning curve
- ✅ Extremely fast local caching
- ✅ Simple `turbo.json` configuration
- ✅ Works seamlessly with npm/pnpm/yarn workspaces
- ✅ Remote caching via Vercel (generous free tier)
- ✅ Lightweight - doesn't impose project structure
- ✅ Great for Lit projects with Vite plugin

**Cons**:
- ❌ Less sophisticated dependency graph than Nx
- ❌ Fewer built-in generators and scaffolding tools
- ❌ No affected-only testing out of the box
- ❌ Less mature than Nx for enterprise features
- ❌ Manual setup for React/Angular wrapper generation

**Ideal For**: Teams wanting simplicity with excellent caching.

---

### Option 3: pnpm Workspaces + Vite + Custom Orchestration

**Overview**: Lean approach using pnpm's native workspace features with Vite, adding tools as needed.

| Category | Details |
|----------|---------|
| **Build Tooling** | pnpm workspaces, Vite, custom scripts |
| **Caching** | pnpm store (dependencies only), no task caching |
| **Minification** | esbuild/terser via Vite |
| **Performance** | Good - fast installs, parallel scripts |
| **Monorepo Support** | Basic - workspace protocol, filtering |
| **Modern Tooling** | Fully modern stack |

**Pros**:
- ✅ Maximum flexibility and control
- ✅ No additional abstractions to learn
- ✅ pnpm is extremely fast for dependency management
- ✅ Smaller node_modules via hard links
- ✅ Easy to understand and debug
- ✅ Can add Nx/Turborepo later if needed

**Cons**:
- ❌ No built-in task caching (must implement or add later)
- ❌ Manual task orchestration required
- ❌ No affected-only builds without additional tooling
- ❌ More maintenance burden for complex pipelines
- ❌ Requires more scripting for CI/CD optimization

**Ideal For**: Small teams wanting full control, or as a starting point before adding orchestration.

---

### Option 4: pnpm + Lerna + Nx (Hybrid Approach)

**Overview**: Combines pnpm for package management, Lerna for independent versioning/publishing, and Nx purely for task caching. This hybrid approach cherry-picks the best features from each tool.

| Category | Details |
|----------|---------||
| **Build Tooling** | pnpm workspaces, Lerna for versioning, Nx for caching |
| **Caching** | Nx local/remote caching (via Nx Cloud) |
| **Minification** | esbuild/terser via Vite |
| **Performance** | Excellent - Nx caching + pnpm speed |
| **Monorepo Support** | Strong - Lerna's mature publishing workflow |
| **Modern Tooling** | Native ESM, TypeScript 5.x |

**How It Works**:
| Tool | Role |
|------|------|
| **pnpm** | Package management, workspace linking, fast installs |
| **Lerna** | Independent versioning, changelog generation, publishing |
| **Nx** | Task caching, affected detection, parallel execution |

> Since Lerna v6+, Nx is the **default task runner** for Lerna, so they integrate seamlessly.

**Pros**:
- ✅ Best-in-class versioning with Lerna's `independent` mode
- ✅ Automatic changelogs from conventional commits
- ✅ Selective publishing - only changed packages
- ✅ Nx caching without full Nx project structure adoption
- ✅ Familiar Lerna workflow (well-documented)
- ✅ Gradual adoption - add Nx features incrementally
- ✅ Mature and battle-tested publishing workflow

**Cons**:
- ❌ Three tools to configure (pnpm-workspace.yaml, lerna.json, nx.json)
- ❌ Some redundancy between Lerna and Nx concepts
- ❌ Lerna now owned by Nx; full Nx may be preferred long-term
- ❌ Slightly more cognitive overhead

**Configuration Example**:
```json
// lerna.json
{
  "version": "independent",
  "npmClient": "pnpm",
  "useNx": true,
  "command": {
    "publish": {
      "conventionalCommits": true,
      "message": "chore(release): publish"
    }
  }
}
```

```json
// nx.json
{
  "tasksRunnerOptions": {
    "default": {
      "runner": "nx/tasks-runners/default",
      "options": {
        "cacheableOperations": ["build", "test", "lint"]
      }
    }
  }
}
```

**Ideal For**: Teams needing independent versioning with Nx caching, or those familiar with Lerna workflows.

---

## Detailed Comparison Matrix

| Feature | Nx + Vite | Turborepo + Vite | pnpm + Vite | pnpm + Lerna + Nx |
|---------|-----------|------------------|-------------|-------------------|
| **Setup Complexity** | Medium-High | Low | Low | Medium |
| **Learning Curve** | Steep | Gentle | Minimal | Moderate |
| **Local Caching** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ❌ | ⭐⭐⭐⭐⭐ |
| **Remote Caching** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ❌ | ⭐⭐⭐⭐⭐ |
| **Affected Detection** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ❌ | ⭐⭐⭐⭐⭐ |
| **Generators/Scaffolding** | ⭐⭐⭐⭐⭐ | ⭐⭐ | ❌ | ⭐⭐ |
| **CI/CD Integration** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Lit Support** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **React/Angular Wrappers** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| **Library Publishing** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Independent Versioning** | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Documentation** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |

---

## Lit-Specific Considerations

### Component Library Build Output

For the `cui-portal` component served as standalone JS/CSS:

```
dist/
├── compute-ui-portal.min.js    # IIFE/UMD bundle
├── compute-ui-portal.esm.js    # ES module bundle  
├── compute-ui.min.css          # Extracted styles
└── types/                      # TypeScript declarations
```

**Recommended Vite Config for Lit Libraries**:
```typescript
// vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'ComputeUIPortal',
      formats: ['es', 'iife'],
      fileName: (format) => `compute-ui-portal.${format === 'es' ? 'esm' : 'min'}.js`
    },
    rollupOptions: {
      external: [], // Bundle all dependencies for standalone use
    },
    minify: 'esbuild',
    sourcemap: true,
  }
});
```

### React/Angular Wrappers

Use `@lit/react` for React wrappers:
```typescript
import { createComponent } from '@lit/react';
import { CuiPortal } from '@oxi-ui/portal';

export const Portal = createComponent({
  tagName: 'cui-portal',
  elementClass: CuiPortal,
  react: React,
});
```

For Angular, use `@lit/angular` or CUSTOM_ELEMENTS_SCHEMA with the standard Lit component.

---

## Recommended Package Structure

```
oxi-ui/
├── packages/
│   ├── components/           # Lit component library
│   │   ├── src/
│   │   ├── package.json
│   │   └── vite.config.ts
│   ├── portal/               # Portal wrapper component
│   │   ├── src/
│   │   ├── package.json
│   │   └── vite.config.ts
│   ├── react/                # React wrappers
│   │   ├── src/
│   │   └── package.json
│   ├── angular/              # Angular wrappers
│   │   ├── src/
│   │   └── package.json
│   ├── core/                 # Shared utilities
│   │   ├── src/
│   │   │   ├── auth/
│   │   │   ├── analytics/
│   │   │   ├── permissions/
│   │   │   └── feature-flags/
│   │   └── package.json
│   └── eslint-config/        # Shared ESLint config
│       ├── index.js
│       └── package.json
├── apps/                     # Demo/docs apps (optional)
│   └── storybook/
├── tools/                    # Custom build scripts
├── package.json
├── pnpm-workspace.yaml
├── turbo.json / nx.json
└── tsconfig.base.json
```

---

## ESLint Configuration Package

For the `eslint-config` package, use the new flat config format:

```javascript
// packages/eslint-config/index.js
import tseslint from 'typescript-eslint';
import litPlugin from 'eslint-plugin-lit';
import prettierConfig from 'eslint-config-prettier';

export default [
  ...tseslint.configs.recommended,
  litPlugin.configs['flat/recommended'],
  prettierConfig,
  {
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'warn',
      'lit/no-legacy-template-syntax': 'error',
    }
  }
];
```

---

## Performance Optimization Strategies

### Build Performance
1. **esbuild for minification** - 10-100x faster than terser
2. **Parallel builds** - Nx/Turborepo handle automatically
3. **Incremental TypeScript** - Enable in tsconfig
4. **SWC for React** - If using React wrappers

### Runtime Performance
1. **Code splitting** - Lazy load non-critical components
2. **Tree shaking** - ES modules enable dead code elimination
3. **CSS containment** - Use Shadow DOM for style isolation
4. **Preload hints** - For critical portal assets

### CI/CD Performance
1. **Remote caching** - Skip unchanged package builds
2. **Affected-only testing** - Test only changed packages
3. **Distributed execution** - Nx Cloud or Turborepo remote execution

---

## Final Recommendation

### **Recommended: Nx + Vite + esbuild + pnpm**

For a production-grade monorepo with Lit components, React/Angular wrappers, and shared utilities, **Nx with Vite** provides the best balance of:

1. **Developer Experience**: Generators for scaffolding new packages, consistent patterns
2. **Performance**: Best-in-class caching, affected detection, parallel execution
3. **Scalability**: Grows with the team, supports enterprise features
4. **Lit Ecosystem**: Native support via `@nx/web` and Vite plugins
5. **Framework Wrappers**: Built-in support for React/Angular package generation

**Recommended Stack**:
| Tool | Purpose |
|------|---------|
| **pnpm** | Package manager (fast, efficient) |
| **Nx** | Monorepo orchestration |
| **Vite** | Dev server + build tool |
| **esbuild** | Minification |
| **TypeScript 5.x** | Type checking |
| **Vitest** | Testing (Vite-native) |
| **Changesets** | Version management |

**Quick Start**:
```bash
# Initialize with Nx
pnpm dlx create-nx-workspace@latest oxi-ui --preset=ts --pm=pnpm

# Add Vite support
pnpm nx add @nx/vite

# Generate Lit library
pnpm nx g @nx/web:library components --bundler=vite
```

---

## Alternative Considerations

### Turborepo + Vite
If the team prefers **simplicity over features**, start with **Turborepo + Vite**. It can handle most monorepo needs with less configuration. Migrate to Nx later if advanced features become necessary.

```bash
# Turborepo quick start
pnpm dlx create-turbo@latest
```

### pnpm + Lerna + Nx (Hybrid)
If **independent versioning and publishing** is a core requirement, the **pnpm + Lerna + Nx** hybrid is an excellent choice:
- Lerna's `independent` mode for per-package semver
- Automatic changelog generation from conventional commits
- Nx caching without adopting full Nx project structure

```bash
# Hybrid setup
pnpm init
pnpm add -D lerna nx
npx lerna init --independent
```

### Nx + Changesets (Alternative to Lerna)
For those who want Nx features with independent versioning but **fewer tools**, consider **Nx + Changesets**:
- Changesets handles independent versioning/changelogs
- Nx handles orchestration and caching
- One less tool to maintain than the Lerna hybrid

```bash
# Nx + Changesets
pnpm dlx create-nx-workspace@latest oxi-ui --preset=ts --pm=pnpm
pnpm add -D @changesets/cli
pnpm changeset init
```

All options are production-ready and widely used in enterprise environments.
