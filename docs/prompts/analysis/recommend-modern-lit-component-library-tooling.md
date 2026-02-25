---
# Front‑matter

title: "Lit Component Library Tooling"
category: lit
version: 0.0.1
---

# 📄 Overview

Recommend modern Lit component library tooling.

> **Goal:** Create a markdown file listing the pros/cons of top libraries/tooling and a final recommendation.

# 🧩 Requirements

- Meet accesability standards.
- Extremely performant.
- Minimal bundle size.
- Tree-shakable exports/imports.
- Minified for production.
- Responsive design.
- Utilizes design tokens via css variables and/or typescript/javascript object.
- Minimum of 90% code coverage.

# 🎯 Scope

- The component library will consist of:
    1. A header component that will contain:
        - Company logo and name
        - Typeahead search field with drop down results
        - Create button with a dropdown menu
        - Actionable icons such as help, alerts
        - User menu - drop down menu with navigable menu items.
    2. A footer component that will contain:
        - The version of the software
        - API reference documentation link
        - Provide Feedback link
        - Copyright information
    3. A side menu that contains:
        - Grouped collapsable menu items related by product category
        - Product menu item links to navigate to that product area
        *Note: The side menu can be pinned open, or will auto collapse to the width of the category logos.
    4. A wrapper component called "eg-portal" that will:
        - Internally use the above components and provide a slot for the consumer to place their content.
        - The integration will be in the `index.html` file
        ```html
        <!doctype html>
        <html lang="en">
        <head>
            <base href="/">
            <meta charset="utf-8">
            <title>Consumer app</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link href="/libs/eg-portal/latest/eg-portal.css" rel="stylesheet">
        </head>
        <body>
            <eg-portal>
                <consumer-app-root />
            </eg-portal>
            <script src="/libs/eg-portal/latest/eg-portal.js"></script>
            <script src="main.js" type="module"></script>
        </body>
        </html>
        ```
- Compare:
    - Bundlers such as vite, bun, other
    - Test runners such as vitetest, bun, other
    - Code minification such as Rolldown, OXC, esbuild, terser, lightning css
    - Code formatters such as Oxfmt and prettier
    - Code linters such as Oxlint and eslint
    - Using Lit css template literal vs. native css
    - Other tooling and optimization not mentioned above.

# ✅ Acceptance criteria

1. A markdown file called "lit-component-library-recommendations.md" placed in the root of this repo in ./docs directory.
2. The markdown file will give a pro/con list summarizing the different libraries and tooling with a final recommendation based on the requirements and scope.
