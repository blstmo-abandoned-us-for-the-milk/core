import { describe, it, expect, vi } from 'vitest';
import { GatewayOpcodes } from '@erinjs/types';
import { WebSocketShard } from './WebSocketShard.js';

class MockWebSocket {
  readyState = 1;
  constructor(_url: string) {}
  send(_data: string | ArrayBufferLike): void {}
  close(_code?: number): void {}
}

describe('WebSocketShard', () => {
  it('emits error and debug when gateway sends GatewayError with string payload', () => {
    const shard = new WebSocketShard({
      url: 'wss://gateway.fluxer.app',
      token: 'test-token',
      intents: 0,
      shardId: 0,
      numShards: 1,
      WebSocket: MockWebSocket,
    });

    const onError = vi.fn();
    const onDebug = vi.fn();
    shard.on('error', onError);
    shard.on('debug', onDebug);

    (
      shard as unknown as { handlePayload: (payload: { op: GatewayOpcodes; d?: unknown }) => void }
    ).handlePayload({
      op: GatewayOpcodes.GatewayError,
      d: 'bad gateway state',
    });

    expect(onError).toHaveBeenCalledTimes(1);
    expect(String(onError.mock.calls[0]?.[0]?.message ?? '')).toContain('bad gateway state');
    expect(onDebug).toHaveBeenCalledTimes(1);
    expect(String(onDebug.mock.calls[0]?.[0] ?? '')).toContain('Gateway error: bad gateway state');
  });

  it('stringifies non-string GatewayError payloads', () => {
    const shard = new WebSocketShard({
      url: 'wss://gateway.fluxer.app',
      token: 'test-token',
      intents: 0,
      shardId: 0,
      numShards: 1,
      WebSocket: MockWebSocket,
    });

    const onError = vi.fn();
    shard.on('error', onError);

    (
      shard as unknown as { handlePayload: (payload: { op: GatewayOpcodes; d?: unknown }) => void }
    ).handlePayload({
      op: GatewayOpcodes.GatewayError,
      d: { code: 500, detail: 'oops' },
    });

    expect(onError).toHaveBeenCalledTimes(1);
    expect(String(onError.mock.calls[0]?.[0]?.message ?? '')).toContain(
      '{"code":500,"detail":"oops"}',
    );
  });
});
