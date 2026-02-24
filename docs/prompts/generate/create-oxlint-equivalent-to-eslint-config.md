---
# Front‑matter

title: 'Convert eslint to Oxlint and prettier to Oxfmt'
category: linting
version: 0.0.1
---

# 📄 Overview

Create a new linting/formatting using Oxlint and Oxfmt based on the current esling-config library
and prettier settings.

> **Goal:** A new @akamai/compute-ui-oxlint-config library.

# 🎯 Scope

- Convert all eslint.\*.mjs in the /packages/compute-ui-eslint-config/lib directory.
- Convert all prettier files in the /packages/compute-ui-eslint-config/lib directory.
- Do not duplicate default styles applied by Oxlint that are described in any eslint.\*.mjs file.
- Do not duplicate default formatting applied by Oxfmt that is described in any prettier file.

# ✅ Acceptance criteria

1. A new library in /packages/compute-ui-oxlint-config with package name
   "@akamai/compute-ui-oxlint-config"
2. A new library in /packages/compute-ui-oxfmt-config @akamai/compute-ui-oxfmt-config (optional
   library - should the lint and format configs be combined? -> recommend an approach)
3. Example cunsomer integration showing the package.json and any config overrides/extensions needed
   to use the librar(ies).
