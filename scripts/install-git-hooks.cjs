'use strict';

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const root = path.resolve(__dirname, '..');
const gitHooksDir = path.join(root, '.githooks');

if (!fs.existsSync(path.join(root, '.git'))) {
  process.exit(0);
}

try {
  execSync('git config core.hooksPath .githooks', {
    cwd: root,
    stdio: 'inherit',
  });
} catch {
  process.exit(0);
}
