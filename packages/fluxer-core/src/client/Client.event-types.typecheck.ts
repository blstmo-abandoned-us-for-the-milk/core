import type { Message } from '../structures/Message.js';
import type { GatewayGuildMembersChunkDispatchData } from '@erinjs/types';
import { Client } from './Client.js';
import { Events } from '../util/Events.js';

type IsAny<T> = 0 extends 1 & T ? true : false;
type Assert<T extends true> = T;
type IsExactly<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false;

const client = new Client();

client.on(Events.MessageCreate, (message) => {
  type _notAny = Assert<IsAny<typeof message> extends false ? true : false>;
  type _exact = Assert<IsExactly<typeof message, Message>>;
  const _messageId: string = message.id;
});

client.on(Events.GuildMembersChunk, (chunk) => {
  type _notAny = Assert<IsAny<typeof chunk> extends false ? true : false>;
  type _exact = Assert<IsExactly<typeof chunk, GatewayGuildMembersChunkDispatchData>>;
  const _guildId: string = chunk.guild_id;
});

client.emit(Events.MessageDeleteBulk, { ids: ['1', '2'], channel_id: '3' });
client.emit(Events.Ready);

// @ts-expect-error MessageCreate listeners receive exactly one message arg
client.on(Events.MessageCreate, (_message, _extra) => {});
