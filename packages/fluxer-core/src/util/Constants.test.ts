import { describe, it, expect } from 'vitest';
import { CDN_URL, STATIC_CDN_URL, DEFAULT_USER_AGENT } from './Constants.js';

describe('Constants', () => {
  it('CDN_URL points to fluxerusercontent', () => {
    expect(CDN_URL).toBe('https://fluxerusercontent.com');
  });

  it('STATIC_CDN_URL points to fluxerstatic', () => {
    expect(STATIC_CDN_URL).toBe('https://fluxerstatic.com');
  });

  it('DEFAULT_USER_AGENT is erin.js', () => {
    expect(DEFAULT_USER_AGENT).toBe('erin.js');
  });
});
