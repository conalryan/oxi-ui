# Prompt: Workspace Recommendations

## Input

What are the recommended build tools, libraries and configurations for a highly performant framework agnostic production grade front-end monorepo that will contain mutliple libraries including:

1. A Lit component library that includes the neccessary wrappers for React and Angular as needed.
2. A Lit component wrapper called "portal" that includes a header, footer and side-menu.
   The consuming application will integrate via their `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Example app</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link href="/libs/compute-ui-portal/latest/compute-ui.min.css" rel="stylesheet" />
  </head>
  <body>
    <cui-portal>
      <akam-root></akam-root>
    </cui-portal>

    <script src="/libs/compute-ui-portal/latest/compute-ui-portal.min.js"></script>
  </body>
</html>
```

3. An eslint-config or similar code quality, formatting and linting library
4. A "core" typescript library that will contain common utility functions, authentication, analytics, permissions and feature flags.

## Output

Generate a markdown file summarizing the top 3 options and the pros/cons of each and a final recommendation.

- Build tooling
- Caching
- Minimification
- Performance
- mono-repo support
- modern tooling

and any other information that is relavent to the Input.

Name the file WORKSPACE_RECOMMENDATIONS.md
