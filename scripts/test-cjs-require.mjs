#!/usr/bin/env node
/**
 * Test that all published erin.js community packages can be required as CJS without throwing.
 * Catches issues when packages fail to load via require().
 *
 * Run from repo root after build:
 *   node scripts/test-cjs-require.mjs
 */

import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

const PACKAGES = [
  '@erinjs/types',
  '@erinjs/util',
  '@erinjs/collection',
  '@erinjs/rest',
  '@erinjs/ws',
  '@erinjs/builders',
  '@erinjs/core',
  '@erinjs/voice',
];

function main() {
  const failed = [];
  for (const pkg of PACKAGES) {
    try {
      require(pkg);
      console.log(`✓ ${pkg}`);
    } catch (err) {
      console.error(`✗ ${pkg}:`, err.message);
      failed.push({ pkg, err });
    }
  }
  if (failed.length > 0) {
    console.error('\nCJS require test failed for:', failed.map((f) => f.pkg).join(', '));
    process.exit(1);
  }
  console.log(`\nAll ${PACKAGES.length} packages load as CJS successfully.`);
}

main();
