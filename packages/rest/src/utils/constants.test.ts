import { describe, it, expect } from 'vitest';
import {
  DEFAULT_API,
  DEFAULT_VERSION,
  DEFAULT_USER_AGENT,
  REQUEST_TIMEOUT,
  MAX_RETRIES,
} from './constants.js';

describe('rest constants', () => {
  it('DEFAULT_API points to Fluxer API', () => {
    expect(DEFAULT_API).toBe('https://api.fluxer.app');
  });

  it('DEFAULT_VERSION is 1', () => {
    expect(DEFAULT_VERSION).toBe('1');
  });

  it('DEFAULT_USER_AGENT contains erin.js and repository URL', () => {
    expect(DEFAULT_USER_AGENT).toContain('erin.js');
    expect(DEFAULT_USER_AGENT).toContain('github.com/blstmo-abandoned-us-for-the-milk/core');
  });

  it('REQUEST_TIMEOUT is 15 seconds', () => {
    expect(REQUEST_TIMEOUT).toBe(15000);
  });

  it('MAX_RETRIES is 3', () => {
    expect(MAX_RETRIES).toBe(3);
  });
});
