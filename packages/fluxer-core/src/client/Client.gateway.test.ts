import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Routes } from '@erinjs/types';
import { Client } from './Client.js';
import { Events } from '../util/Events.js';
import { Invite } from '../structures/Invite.js';
import { Guild } from '../structures/Guild.js';

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

  it('handles GUILD_MEMBERS_CHUNK by caching members and emitting GuildMembersChunk', async () => {
    const guild = new Guild(client, {
      id: 'g1',
      name: 'Test Guild',
      icon: null,
      banner: null,
      splash: null,
      owner_id: 'owner1',
      features: [],
      afk_timeout: 0,
      nsfw_level: 0,
      verification_level: 0,
      mfa_level: 0,
      explicit_content_filter: 0,
      default_message_notifications: 0,
    });
    client.guilds.set(guild.id, guild);

    const emit = vi.spyOn(client, 'emit');
    const payload = {
      guild_id: 'g1',
      chunk_index: 0,
      chunk_count: 1,
      members: [
        {
          user: { id: 'u1', username: 'alice', discriminator: '0' },
          roles: [],
          joined_at: new Date().toISOString(),
        },
      ],
      nonce: 'test-nonce',
    };

    await (
      client as unknown as { handleDispatch: (dispatchPayload: unknown) => Promise<void> }
    ).handleDispatch({
      op: 0,
      t: 'GUILD_MEMBERS_CHUNK',
      d: payload,
    });

    const member = guild.members.get('u1');
    expect(member).toBeTruthy();
    expect(member?.id).toBe('u1');

    const chunkCall = emit.mock.calls.find((call) => call[0] === Events.GuildMembersChunk);
    expect(chunkCall).toBeTruthy();
    expect(chunkCall?.[1]).toEqual(payload);
  });

  it('emits GuildMembersChunk even when guild is not cached', async () => {
    const emit = vi.spyOn(client, 'emit');
    const payload = {
      guild_id: 'missing-guild',
      chunk_index: 0,
      chunk_count: 1,
      members: [],
      nonce: 'missing-guild',
    };

    await (
      client as unknown as { handleDispatch: (dispatchPayload: unknown) => Promise<void> }
    ).handleDispatch({
      op: 0,
      t: 'GUILD_MEMBERS_CHUNK',
      d: payload,
    });

    const chunkCall = emit.mock.calls.find((call) => call[0] === Events.GuildMembersChunk);
    expect(chunkCall).toBeTruthy();
    expect(chunkCall?.[1]).toEqual(payload);
  });

  it('ignores invalid members in GUILD_MEMBERS_CHUNK and caches valid ones', async () => {
    const guild = new Guild(client, {
      id: 'g2',
      name: 'Test Guild 2',
      icon: null,
      banner: null,
      splash: null,
      owner_id: 'owner1',
      features: [],
      afk_timeout: 0,
      nsfw_level: 0,
      verification_level: 0,
      mfa_level: 0,
      explicit_content_filter: 0,
      default_message_notifications: 0,
    });
    client.guilds.set(guild.id, guild);

    await (
      client as unknown as { handleDispatch: (dispatchPayload: unknown) => Promise<void> }
    ).handleDispatch({
      op: 0,
      t: 'GUILD_MEMBERS_CHUNK',
      d: {
        guild_id: 'g2',
        chunk_index: 0,
        chunk_count: 1,
        members: [
          {
            roles: [],
            joined_at: new Date().toISOString(),
          },
          {
            user: { id: 'u2', username: 'bob', discriminator: '0' },
            roles: [],
            joined_at: new Date().toISOString(),
          },
        ],
      },
    });

    expect(guild.members.get('u2')).toBeTruthy();
    expect(guild.members.size).toBe(1);
  });
});
