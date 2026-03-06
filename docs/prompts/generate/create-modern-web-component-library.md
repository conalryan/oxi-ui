---
# Front‑matter

title: 'Web component library'
category: git
version: 0.0.1
---

# 📄 Overview

Create a modern canonical web-component library using Lit.

> **Goal:** Create a web component library using lit.

# 🧩 Requirements

- The library should be performant and optimzied with minification.
- The depencies should be limited to avoid bloat in bundle size.
- The library should use this workspace's @oxi-ui/theme, @oxi-ui/oxlint and @oxi-ui/oxfmt libraries.
- Components must have unit tests with 90% code coverage using vitetest.
- Follows the [Lit component library recommendations](../../lit-component-library-recommendations.md).

# 🎯 Scope

- Create a single button.
- Create a text field.
- Create React wrappers using @lit/react package.
- Create Angular wrappers when they are needed for two-way binding and reactive form controls.

# ✅ Acceptance criteria

1. A new library in the monorepo called @oxi-ui/components
2. The requirements and scope have been met fully.
