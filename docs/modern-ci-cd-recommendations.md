# CI/CD Recommendations for Modern Front-End Monorepo

## Executive Summary

This document evaluates CI/CD tooling options for a production-grade front-end monorepo containing:

- **Theme package**: CSS and design tokens in TypeScript
- **Core package**: Utilities, authentication, permissions in TypeScript
- **Web-components package**: Lit components with React and Angular wrappers
- **Future**: Additional libraries and applications

**Current Stack**: Bun, Vite, OXC, TurboRepo, Changesets, Docker, Jenkins

---

## CI/CD Options Comparison

### Option 1: GitHub Actions + GitHub Packages

**Overview**: GitHub's native CI/CD platform with integrated package registry. Seamless integration
with repository events, pull requests, and branch protection.

| Category        | Details                                                       |
| --------------- | ------------------------------------------------------------- |
| **Platform**    | GitHub-hosted or self-hosted runners                          |
| **Registry**    | GitHub Packages (npm-compatible) or npm registry              |
| **Caching**     | Native action caching, Turborepo remote cache                 |
| **Parallelism** | Matrix builds, concurrent jobs                                |
| **Secrets**     | GitHub Secrets, OIDC for cloud providers                      |
| **Pricing**     | Free for public repos; 2,000-50,000 minutes/month for private |

**Pros**:

- ✅ Native GitHub integration - PR checks, status badges, branch protection
- ✅ Extensive marketplace with 15,000+ pre-built actions
- ✅ First-class Bun support via `oven-sh/setup-bun` action
- ✅ Matrix builds for parallel testing across Node/Bun versions
- ✅ Reusable workflows for DRY pipeline configuration
- ✅ GitHub Packages provides private npm registry (included in pricing)
- ✅ OIDC authentication eliminates long-lived secrets for npm publish
- ✅ Excellent caching with `actions/cache` (up to 10GB per repo)
- ✅ Self-hosted runners for custom environments (Docker, specific OS)
- ✅ Dependabot integration for automated dependency updates
- ✅ Built-in code scanning and security alerts

**Cons**:

- ❌ Vendor lock-in to GitHub ecosystem
- ❌ YAML configuration can become complex for large pipelines
- ❌ Limited free minutes for private repositories
- ❌ GitHub Packages npm registry less mature than npmjs.com
- ❌ No built-in dashboard for cross-repo pipeline visibility
- ❌ Cold start time for runners (mitigated by self-hosted)

**GitHub Actions Workflow Example**:

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  TURBO_TOKEN: ${{ secrets.TURBO_TOKEN }}
  TURBO_TEAM: ${{ vars.TURBO_TEAM }}

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: latest

      - name: Cache Bun dependencies
        uses: actions/cache@v4
        with:
          path: ~/.bun/install/cache
          key: ${{ runner.os }}-bun-${{ hashFiles('**/bun.lockb') }}
          restore-keys: ${{ runner.os }}-bun-

      - name: Install dependencies
        run: bun install --frozen-lockfile

      - name: Lint & Format
        run: |
          bunx turbo run lint --affected
          bun run format:check

      - name: Test
        run: bunx turbo run test:coverage --affected

      - name: Build
        run: bunx turbo run build --affected

      - name: Upload coverage
        uses: codecov/codecov-action@v4
        with:
          files: ./packages/*/coverage/lcov.info

  release:
    needs: build
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    permissions:
      contents: write
      packages: write
      id-token: write
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
          token: ${{ secrets.GITHUB_TOKEN }}

      - uses: oven-sh/setup-bun@v2

      - run: bun install --frozen-lockfile

      - name: Create Release PR or Publish
        uses: changesets/action@v1
        with:
          publish: bunx changeset publish
          version: bunx changeset version
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

**Ideal For**: Teams already using GitHub with modern workflows and wanting tight integration.

---

### Option 2: Jenkins (Current) + Docker + npm Registry

**Overview**: Self-hosted Jenkins with Docker-based builds. Full control over infrastructure and
pipeline configuration.

| Category        | Details                                          |
| --------------- | ------------------------------------------------ |
| **Platform**    | Self-hosted Jenkins server                       |
| **Registry**    | npmjs.com or private registry (Verdaccio, Nexus) |
| **Caching**     | Docker layer caching, Bun cache volume mounts    |
| **Parallelism** | Parallel stages, distributed builds              |
| **Secrets**     | Jenkins Credentials, HashiCorp Vault integration |
| **Pricing**     | Infrastructure costs only (self-managed)         |

**Pros**:

- ✅ Complete control over build environment and infrastructure
- ✅ No vendor lock-in - runs anywhere
- ✅ Existing Jenkinsfile already configured for this repo
- ✅ Docker-based builds ensure consistency across environments
- ✅ Extensive plugin ecosystem (1,800+ plugins)
- ✅ Pipeline as Code with Groovy (powerful scripting)
- ✅ Integration with enterprise SSO, LDAP, and compliance tools
- ✅ No per-minute billing - fixed infrastructure cost
- ✅ Self-hosted runners eliminate cold start delays
- ✅ Blue Ocean UI provides modern visualization

**Cons**:

- ❌ Significant maintenance overhead (updates, security patches)
- ❌ Requires dedicated infrastructure and DevOps expertise
- ❌ Groovy syntax less accessible than YAML
- ❌ Plugin compatibility issues during upgrades
- ❌ No native GitHub PR integration (requires plugins)
- ❌ Scaling requires manual configuration
- ❌ Less community momentum compared to modern alternatives

**Current Jenkinsfile Improvements**:

```groovy
// Enhanced Jenkinsfile with Turborepo remote caching
pipeline {
    agent {
        dockerfile {
            filename 'Dockerfile'
            additionalBuildArgs '--target development'
            args '-v $HOME/.bun:/home/bun/.bun:rw'
        }
    }

    environment {
        CI = 'true'
        NPM_TOKEN = credentials('npm-token')
        TURBO_TOKEN = credentials('turbo-token')
        TURBO_TEAM = 'oxi-ui'
    }

    stages {
        stage('Install') {
            steps {
                sh 'bun install --frozen-lockfile'
            }
        }

        stage('Quality & Test') {
            parallel {
                stage('Lint') {
                    steps { sh 'bunx turbo run lint' }
                }
                stage('Test') {
                    steps { sh 'bunx turbo run test:coverage' }
                }
                stage('Build') {
                    steps { sh 'bunx turbo run build' }
                }
            }
        }

        stage('Release') {
            when { branch 'main' }
            steps {
                script {
                    sh '''
                        bunx changeset version
                        bunx turbo run build
                        bunx changeset publish
                        git push --follow-tags
                    '''
                }
            }
        }
    }
}
```

**Ideal For**: Organizations with existing Jenkins infrastructure and DevOps teams.

---

### Option 3: GitLab CI/CD + GitLab Package Registry

**Overview**: GitLab's integrated DevOps platform with built-in CI/CD, container registry, and
package management.

| Category        | Details                                         |
| --------------- | ----------------------------------------------- |
| **Platform**    | GitLab.com SaaS or self-hosted                  |
| **Registry**    | GitLab Package Registry (npm-compatible)        |
| **Caching**     | Distributed cache, dependency proxy             |
| **Parallelism** | Parallel jobs, DAG pipelines                    |
| **Secrets**     | CI/CD Variables, HashiCorp Vault integration    |
| **Pricing**     | Free tier (400 minutes); Premium $29/user/month |

**Pros**:

- ✅ Complete DevOps platform in one tool
- ✅ Built-in npm package registry
- ✅ DAG-based pipelines for complex dependencies
- ✅ Auto DevOps for zero-config pipelines
- ✅ Built-in SAST, DAST, and dependency scanning
- ✅ Review Apps for PR previews
- ✅ Kubernetes integration for deployment
- ✅ Parent-child pipelines for monorepo orchestration

**Cons**:

- ❌ Requires migration from GitHub
- ❌ UI can feel overwhelming
- ❌ Smaller action/template ecosystem than GitHub
- ❌ Self-hosted requires significant resources
- ❌ Learning curve for GitLab-specific concepts

**GitLab CI Example**:

```yaml
# .gitlab-ci.yml
stages:
  - install
  - quality
  - build
  - release

variables:
  BUN_INSTALL: $CI_PROJECT_DIR/.bun

.bun-cache:
  cache:
    key: bun-$CI_COMMIT_REF_SLUG
    paths:
      - .bun/
      - node_modules/

install:
  stage: install
  extends: .bun-cache
  script:
    - curl -fsSL https://bun.sh/install | bash
    - export PATH="$BUN_INSTALL/bin:$PATH"
    - bun install --frozen-lockfile

lint:
  stage: quality
  needs: [install]
  script:
    - bunx turbo run lint --affected

test:
  stage: quality
  needs: [install]
  script:
    - bunx turbo run test:coverage --affected
  artifacts:
    reports:
      coverage_report:
        coverage_format: cobertura
        path: packages/*/coverage/cobertura-coverage.xml

build:
  stage: build
  needs: [lint, test]
  script:
    - bunx turbo run build

release:
  stage: release
  needs: [build]
  rules:
    - if: $CI_COMMIT_BRANCH == "main"
  script:
    - bunx changeset version
    - bunx changeset publish
```

**Ideal For**: Teams wanting an all-in-one DevOps platform with strong security features.

---

### Option 4: CircleCI + npm Registry

**Overview**: Cloud-native CI/CD platform known for speed, caching efficiency, and Docker support.

| Category        | Details                                          |
| --------------- | ------------------------------------------------ |
| **Platform**    | CircleCI Cloud or Server (self-hosted)           |
| **Registry**    | npmjs.com or private registries                  |
| **Caching**     | Aggressive caching, workspaces for job artifacts |
| **Parallelism** | Parallelism, resource classes, test splitting    |
| **Secrets**     | Contexts, OIDC, environment variables            |
| **Pricing**     | Free (6,000 minutes); Performance from $15/month |

**Pros**:

- ✅ Excellent caching - often faster than alternatives
- ✅ First-class Docker support (Docker layer caching)
- ✅ Orbs ecosystem for reusable configurations
- ✅ SSH debugging for failed builds
- ✅ Insights dashboard for pipeline analytics
- ✅ Test splitting for parallel test execution
- ✅ Config validation CLI
- ✅ Strong open source support

**Cons**:

- ❌ Third-party integration (not native to GitHub)
- ❌ Orbs can introduce dependencies on external authors
- ❌ Pricing can escalate with heavy usage
- ❌ Less intuitive for GitHub-centric workflows
- ❌ Limited native security scanning

**CircleCI Config Example**:

```yaml
# .circleci/config.yml
version: 2.1

orbs:
  bun: oven-sh/bun@1

executors:
  bun-executor:
    docker:
      - image: oven/bun:latest
    resource_class: medium

jobs:
  install:
    executor: bun-executor
    steps:
      - checkout
      - restore_cache:
          keys:
            - bun-deps-{{ checksum "bun.lockb" }}
      - run: bun install --frozen-lockfile
      - save_cache:
          key: bun-deps-{{ checksum "bun.lockb" }}
          paths:
            - node_modules
            - ~/.bun
      - persist_to_workspace:
          root: .
          paths: [.]

  quality:
    executor: bun-executor
    parallelism: 2
    steps:
      - attach_workspace:
          at: .
      - run:
          name: Lint & Test
          command: |
            bunx turbo run lint test:coverage --affected

  build:
    executor: bun-executor
    steps:
      - attach_workspace:
          at: .
      - run: bunx turbo run build

  release:
    executor: bun-executor
    steps:
      - attach_workspace:
          at: .
      - run:
          name: Publish
          command: |
            bunx changeset version
            bunx changeset publish

workflows:
  ci:
    jobs:
      - install
      - quality:
          requires: [install]
      - build:
          requires: [quality]
      - release:
          requires: [build]
          filters:
            branches:
              only: main
```

**Ideal For**: Teams prioritizing build speed and caching efficiency.

---

### Option 5: Vercel + Turborepo Remote Cache + npm Registry

**Overview**: Specialized for frontend with native Turborepo integration. Excellent for preview
deployments and edge hosting.

| Category        | Details                                     |
| --------------- | ------------------------------------------- |
| **Platform**    | Vercel Cloud (serverless)                   |
| **Registry**    | npmjs.com (Vercel doesn't host packages)    |
| **Caching**     | Turborepo Remote Cache (native integration) |
| **Parallelism** | Concurrent builds, edge functions           |
| **Secrets**     | Environment variables, integration hub      |
| **Pricing**     | Free (hobby); Pro $20/user/month            |

**Pros**:

- ✅ Native Turborepo remote caching (developed by Vercel)
- ✅ Zero-config preview deployments for PRs
- ✅ Edge hosting for demos and documentation
- ✅ Excellent for Storybook/documentation hosting
- ✅ GitHub integration with automatic builds
- ✅ Environment variable management per branch

**Cons**:

- ❌ Not a full CI/CD solution - limited to build/deploy
- ❌ No npm package publishing workflow
- ❌ Requires separate CI for testing and linting
- ❌ Focused on web applications, not libraries
- ❌ Limited customization compared to full CI platforms

**Hybrid Approach (Vercel + GitHub Actions)**:

```yaml
# Use Vercel for previews, GitHub Actions for CI/publish
# .github/workflows/ci.yml handles lint, test, publish
# vercel.json handles preview deployments

# vercel.json
{
  'buildCommand': 'bunx turbo run build --filter=@oxi-ui/docs',
  'installCommand': 'bun install',
  'framework': null,
}
```

**Ideal For**: Teams wanting preview deployments with Turborepo caching, combined with another CI
tool.

---

## Detailed Comparison Matrix

| Feature                 | GitHub Actions | Jenkins    | GitLab CI    | CircleCI    | Vercel     |
| ----------------------- | -------------- | ---------- | ------------ | ----------- | ---------- |
| **Setup Complexity**    | Low            | High       | Medium       | Low         | Very Low   |
| **Maintenance**         | None           | High       | Medium       | None        | None       |
| **GitHub Integration**  | ⭐⭐⭐⭐⭐     | ⭐⭐⭐     | ⭐⭐         | ⭐⭐⭐⭐    | ⭐⭐⭐⭐   |
| **Bun Support**         | ⭐⭐⭐⭐⭐     | ⭐⭐⭐⭐   | ⭐⭐⭐       | ⭐⭐⭐⭐    | ⭐⭐⭐⭐⭐ |
| **Turborepo Cache**     | ⭐⭐⭐⭐       | ⭐⭐⭐     | ⭐⭐⭐       | ⭐⭐⭐⭐    | ⭐⭐⭐⭐⭐ |
| **Changesets Support**  | ⭐⭐⭐⭐⭐     | ⭐⭐⭐⭐   | ⭐⭐⭐⭐     | ⭐⭐⭐⭐    | ⭐⭐       |
| **npm Publishing**      | ⭐⭐⭐⭐⭐     | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐     | ⭐⭐⭐⭐⭐  | ❌         |
| **Docker Support**      | ⭐⭐⭐⭐       | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐   | ⭐⭐⭐⭐⭐  | ⭐⭐       |
| **Security Scanning**   | ⭐⭐⭐⭐       | ⭐⭐⭐     | ⭐⭐⭐⭐⭐   | ⭐⭐⭐      | ⭐⭐       |
| **Cost (Team of 5)**    | Free-$21/mo    | Infra only | Free-$145/mo | Free-$15/mo | $100/mo    |
| **Preview Deployments** | ⭐⭐⭐         | ⭐⭐       | ⭐⭐⭐⭐     | ⭐⭐⭐      | ⭐⭐⭐⭐⭐ |
| **Enterprise Features** | ⭐⭐⭐⭐       | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐   | ⭐⭐⭐⭐    | ⭐⭐⭐     |

---

## Package Registry Comparison

### npm Registry (npmjs.com)

**Pros**:

- ✅ Industry standard - universal compatibility
- ✅ Largest ecosystem
- ✅ Granular access controls with npm Organizations
- ✅ Provenance signatures for supply chain security
- ✅ Automated security scanning

**Cons**:

- ❌ Pro/Teams pricing for private packages ($7-14/user/month)
- ❌ Rate limiting on free tier

### GitHub Packages

**Pros**:

- ✅ Included with GitHub plans
- ✅ Native GITHUB_TOKEN authentication
- ✅ Package visibility tied to repository
- ✅ Unified billing with GitHub

**Cons**:

- ❌ Always requires authentication (even for public packages)
- ❌ Scoped packages only (@org/package)
- ❌ Less adoption than npmjs.com

### Private Registries (Verdaccio, Nexus, Artifactory)

**Pros**:

- ✅ Full control over package hosting
- ✅ Caching proxy for npm registry
- ✅ Air-gapped environments support
- ✅ No per-package costs

**Cons**:

- ❌ Infrastructure maintenance
- ❌ Additional tooling to manage

**Recommendation**: Use **npmjs.com** for public packages (standard for open source), with GitHub
Packages as an option for internal/private packages.

---

## Tooling Integration

### Turborepo Remote Caching

Essential for monorepo CI performance. Options:

| Provider        | Setup                  | Cost                |
| --------------- | ---------------------- | ------------------- |
| **Vercel**      | Native (`TURBO_TOKEN`) | Free tier available |
| **Self-hosted** | `turbo-remote-cache`   | Infrastructure only |
| **Nx Cloud**    | Requires Nx migration  | Free tier available |

**Recommended Setup**:

```yaml
# GitHub Actions with Vercel remote cache
env:
  TURBO_TOKEN: ${{ secrets.TURBO_TOKEN }}
  TURBO_TEAM: ${{ vars.TURBO_TEAM }}
  TURBO_REMOTE_ONLY: true # Skip local cache in CI
```

### Changesets Integration

Changesets works seamlessly with all CI platforms:

```yaml
# GitHub Actions (recommended)
- uses: changesets/action@v1
  with:
    publish: bunx changeset publish
    version: bunx changeset version
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### OXC (Oxc) Integration

OXC tools integrate into the pipeline for linting and formatting:

```json
// turbo.json
{
  "tasks": {
    "lint": {
      "dependsOn": ["^build"],
      "inputs": ["src/**/*.ts", "src/**/*.tsx"],
      "cache": true
    },
    "format:check": {
      "cache": true
    }
  }
}
```

---

## Migration Path from Jenkins to GitHub Actions

### Phase 1: Parallel Running (Week 1-2)

Run both Jenkins and GitHub Actions simultaneously:

```yaml
# .github/workflows/ci.yml - mirrors Jenkinsfile
name: CI (GitHub Actions)
on: [push, pull_request]
# ... full pipeline
```

### Phase 2: Feature Parity Validation (Week 3-4)

- Compare build times and caching efficiency
- Validate Changesets publishing workflow
- Test secrets management

### Phase 3: Cutover (Week 5)

- Disable Jenkins pipeline
- Archive Jenkinsfile (keep for reference)
- Update branch protection rules

### Phase 4: Optimization (Week 6+)

- Enable Turborepo remote caching
- Add matrix builds for multiple Bun versions
- Implement reusable workflows

---

## Security Considerations

### Secrets Management

| Platform           | Best Practice                          |
| ------------------ | -------------------------------------- |
| **GitHub Actions** | Use OIDC for npm (`id-token: write`)   |
| **Jenkins**        | HashiCorp Vault or Jenkins Credentials |
| **CircleCI**       | Contexts with restricted access        |

### Supply Chain Security

1. **Lock dependencies**: `bun install --frozen-lockfile`
2. **Enable npm provenance**: `npm publish --provenance`
3. **Dependency scanning**: Dependabot, Snyk, or `bun audit`
4. **Signed commits**: Required for release branches

---

## Final Recommendation

### **Recommended: GitHub Actions + npm Registry + Turborepo Remote Cache**

For this monorepo with Bun, Vite, Turborepo, and Changesets, **GitHub Actions** provides the optimal
balance:

| Factor          | GitHub Actions Advantage                               |
| --------------- | ------------------------------------------------------ |
| **Integration** | Native GitHub PR checks, branch protection, Dependabot |
| **Changesets**  | Official `changesets/action` with PR automation        |
| **Bun Support** | First-class `oven-sh/setup-bun` action                 |
| **Turborepo**   | Easy remote cache integration via Vercel               |
| **Maintenance** | Zero infrastructure burden                             |
| **Cost**        | Free for public repos; generous private tier           |

### Recommended Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     GitHub Repository                        │
├─────────────────────────────────────────────────────────────┤
│  PR Push ──► GitHub Actions ──► Turborepo Remote Cache      │
│                    │               (Vercel)                  │
│                    ▼                                         │
│            ┌───────────────┐                                 │
│            │  Quality Gate │                                 │
│            │  - Lint (OXC) │                                 │
│            │  - Test       │                                 │
│            │  - Build      │                                 │
│            └───────┬───────┘                                 │
│                    │                                         │
│         ┌─────────┴─────────┐                               │
│         ▼                   ▼                               │
│   [PR Merge]          [main branch]                         │
│                             │                               │
│                    ┌────────┴────────┐                      │
│                    │  Changesets     │                      │
│                    │  - Version PR   │                      │
│                    │  - Publish npm  │                      │
│                    └─────────────────┘                      │
└─────────────────────────────────────────────────────────────┘
```

### Recommended Stack Summary

| Component              | Tool                   | Purpose                             |
| ---------------------- | ---------------------- | ----------------------------------- |
| **CI/CD Platform**     | GitHub Actions         | Pipeline orchestration              |
| **Package Registry**   | npmjs.com              | Public package distribution         |
| **Remote Cache**       | Vercel (Turborepo)     | Build caching across CI runs        |
| **Version Management** | Changesets             | Automated versioning and changelogs |
| **Secrets**            | GitHub Secrets + OIDC  | Secure credential management        |
| **Security**           | Dependabot + npm audit | Dependency vulnerability scanning   |

### Quick Start

```bash
# 1. Create GitHub Actions workflow
mkdir -p .github/workflows
# Add ci.yml from example above

# 2. Configure Turborepo remote cache
bunx turbo login
bunx turbo link

# 3. Add secrets to GitHub repository
# Settings > Secrets > Actions
# - NPM_TOKEN: npm automation token
# - TURBO_TOKEN: from `turbo login`
# - TURBO_TEAM: your Vercel team slug

# 4. Enable Changesets GitHub Action
# The changesets/action will create Release PRs automatically
```

### Keeping Jenkins as Backup

If organizational requirements mandate Jenkins, consider a hybrid approach:

1. **GitHub Actions**: PR validation, Changesets automation
2. **Jenkins**: Release builds, compliance scanning, enterprise integrations

This allows gradual migration while maintaining existing infrastructure.

---

## Alternative Considerations

### GitLab CI

If migrating away from GitHub is acceptable and security scanning is critical, GitLab CI offers:

- Built-in SAST/DAST
- Complete DevOps platform
- Strong container registry

### CircleCI

For teams prioritizing raw build speed and complex test splitting:

- Superior caching mechanisms
- SSH debugging
- Excellent Docker layer caching

### Hybrid: GitHub Actions + Vercel

For projects with documentation or Storybook that benefit from preview deployments:

- GitHub Actions for CI/publish
- Vercel for preview deployments and Turborepo cache

All options support Bun, Turborepo, and Changesets for modern front-end monorepo workflows.
