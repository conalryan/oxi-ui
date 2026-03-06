import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const consumerRoot = process.env.INIT_CWD || process.cwd();
const targetPath = path.join(consumerRoot, '.oxfmtrc.json');
const sourcePath = path.join(__dirname, 'oxfmtrc.json');

if (fs.existsSync(targetPath)) {
  // Don't overwrite user config
  process.stdout.write('[compute-ui-oxfmt] `.oxfmtrc.json` already exists, skipping.\n');
  process.exit(0);
}

try {
  fs.copyFileSync(sourcePath, targetPath);
  process.stdout.write('[compute-ui-oxfmt] Created `.oxfmtrc.json` in your project root.\n');
} catch (err) {
  process.stderr.write(`[compute-ui-oxfmt] Failed to create .oxfmtrc.json: ${err.message}\n`);
  process.exitCode = 1;
}
