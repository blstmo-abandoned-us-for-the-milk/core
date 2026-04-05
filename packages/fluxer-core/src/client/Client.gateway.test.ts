import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Routes } from '@erinjs/types';
import { Client } from './Client.js';
import { Events } from '../util/Events.js';
import { Invite } from '../structures/Invite.js';

describe('Client gateway helpers and dispatch', () => {
  let client: Client;

  beforeEach(() => {
    client = new Client();
  });

  it('fetchGatewayInfo() fetches gateway metadata from /gateway/bot', async () => {
    const gatewayInfo = {
      url: 'wss://gateway.fluxer.app',
      shards: 2,
      session_start_limit: {
        total: 1000,
        remaining: 999,
        reset_after: 60000,
        max_concurrency: 1,
      },
    };
    const get = vi.spyOn(client.rest, 'get').mockResolvedValue(gatewayInfo);

    const result = await client.fetchGatewayInfo();

    expect(get).toHaveBeenCalledWith(Routes.gatewayBot());
    expect(result).toEqual(gatewayInfo);
  });

  it('emits InviteCreate for partial INVITE_CREATE payloads and logs debug metadata', async () => {
    const emit = vi.spyOn(client, 'emit');

    await (
      client as unknown as { handleDispatch: (payload: unknown) => Promise<void> }
    ).handleDispatch({
      op: 0,
      t: 'INVITE_CREATE',
      d: {
        code: 'abc123',
        guild_id: 'g1',
        channel_id: 'c1',
      },
    });

    const inviteCall = emit.mock.calls.find((call) => call[0] === Events.InviteCreate);
    expect(inviteCall).toBeTruthy();
    const invite = inviteCall?.[1] as Invite;
    expect(invite).toBeInstanceOf(Invite);
    expect(invite.code).toBe('abc123');
    expect(invite.guild.id).toBe('g1');
    expect(invite.channel.id).toBe('c1');

    const debugCall = emit.mock.calls.find(
      (call) => call[0] === Events.Debug && String(call[1]).includes('INVITE_CREATE code=abc123'),
    );
    expect(debugCall).toBeTruthy();
  });

  it('ignores malformed INVITE_CREATE payloads without code and logs debug message', async () => {
    const emit = vi.spyOn(client, 'emit');

    await (
      client as unknown as { handleDispatch: (payload: unknown) => Promise<void> }
    ).handleDispatch({
      op: 0,
      t: 'INVITE_CREATE',
      d: {
        guild_id: 'g1',
        channel_id: 'c1',
      },
    });

    expect(emit.mock.calls.some((call) => call[0] === Events.InviteCreate)).toBe(false);
    const debugCall = emit.mock.calls.find(
      (call) =>
        call[0] === Events.Debug &&
        String(call[1]).includes('INVITE_CREATE payload had no invite code'),
    );
    expect(debugCall).toBeTruthy();
  });
});
