#!/usr/bin/env node
/**
 * Exercise actual code from each published erin.js community package.
 * Verifies exports work and basic functionality runs (not just import).
 *
 * Run from repo root after build:
 *   node scripts/test-package-exports.mjs
 */

const TESTS = [
  {
    pkg: '@erinjs/types',
    exercise: async (m) => {
      if (typeof m.Routes?.channel !== 'function') throw new Error('Routes.channel missing');
      if (m.Routes.channel('123') !== '/channels/123') throw new Error('Routes.channel() wrong');
    },
  },
  {
    pkg: '@erinjs/util',
    exercise: async (m) => {
      if (!m.SnowflakeUtil?.isValid('0')) throw new Error('SnowflakeUtil.isValid failed');
      const id = m.SnowflakeUtil?.snowflakeFromTimestamp?.(Date.now());
      if (typeof id !== 'string') throw new Error('SnowflakeUtil.snowflakeFromTimestamp failed');
    },
  },
  {
    pkg: '@erinjs/collection',
    exercise: async (m) => {
      const coll = new m.Collection();
      if (coll.size !== 0) throw new Error('Collection.size wrong');
      coll.set('a', 1);
      if (coll.get('a') !== 1) throw new Error('Collection set/get failed');
    },
  },
  {
    pkg: '@erinjs/rest',
    exercise: async (m) => {
      const rm = new m.RequestManager({ baseURL: 'https://example.com' });
      if (typeof rm.request !== 'function') throw new Error('RequestManager.request missing');
    },
  },
  {
    pkg: '@erinjs/ws',
    exercise: async (m) => {
      if (typeof m.GatewayCloseCodes !== 'object') throw new Error('GatewayCloseCodes missing');
      if (m.GatewayCloseCodes.Normal !== 1000) throw new Error('GatewayCloseCodes.Normal wrong');
    },
  },
  {
    pkg: '@erinjs/builders',
    exercise: async (m) => {
      const embed = new m.EmbedBuilder().setTitle('test').setDescription('desc');
      const json = embed.toJSON();
      if (json.title !== 'test' || json.description !== 'desc') {
        throw new Error('EmbedBuilder toJSON failed');
      }
    },
  },
  {
    pkg: '@erinjs/core',
    exercise: async (m) => {
      if (typeof m.Client !== 'function') throw new Error('Client missing');
      if (typeof m.Events !== 'object') throw new Error('Events missing');
      if (!m.Events.Ready) throw new Error('Events.Ready missing');
    },
  },
  {
    pkg: '@erinjs/voice',
    exercise: async (m) => {
      const mockClient = { on: () => {} };
      const manager = m.getVoiceManager(mockClient);
      if (!manager || typeof manager.join !== 'function') {
        throw new Error('getVoiceManager returned invalid VoiceManager');
      }
    },
  },
];

async function main() {
  const failed = [];
  for (const { pkg, exercise } of TESTS) {
    try {
      const m = await import(pkg);
      await exercise(m);
      console.log(`✓ ${pkg} (exercised)`);
    } catch (err) {
      console.error(`✗ ${pkg}:`, err.message);
      failed.push({ pkg, err });
    }
  }
  if (failed.length > 0) {
    console.error('\nPackage export test failed for:', failed.map((f) => f.pkg).join(', '));
    process.exit(1);
  }
  console.log(`\nAll ${TESTS.length} packages exercised successfully.`);
}

main();
