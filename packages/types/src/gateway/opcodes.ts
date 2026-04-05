/**
 * Gateway opcodes.
 * @see https://docs.fluxer.app/gateway/opcodes
 */
export enum GatewayOpcodes {
  Dispatch = 0,
  Heartbeat = 1,
  Identify = 2,
  PresenceUpdate = 3,
  VoiceStateUpdate = 4,
  VoiceServerPing = 5,
  Resume = 6,
  Reconnect = 7,
  RequestGuildMembers = 8,
  InvalidSession = 9,
  Hello = 10,
  HeartbeatAck = 11,
  GatewayError = 12,
  LazyRequest = 14,
}
