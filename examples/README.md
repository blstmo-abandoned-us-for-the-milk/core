# erin.js SDK Examples

Example bots demonstrating common use cases with the erin.js SDK.

## Quickest start

From the repo root after `pnpm install && pnpm run build`:

```bash
FLUXER_BOT_TOKEN=your_token node examples/minimal-bot.js
```

That runs the [minimal bot](minimal-bot.js) — login + `!ping` → Pong. Guide route: `/v/latest/guides/basic-bot`.

Public guide: https://erin.js.org/v/latest/guides/basic-bot

To browse guides locally, run `pnpm run docs:dev` from the repo root and open `http://localhost:3333`.

## Setup

1. Install dependencies from the repository root:

   ```bash
   pnpm install
   pnpm run build
   ```

2. Copy `.env.example` to `.env` and fill in your credentials:

   ```bash
   cp .env.example .env
   ```

3. Run any example:

   ```bash
   FLUXER_BOT_TOKEN=your_token node examples/minimal-bot.js
   ```

## Examples

| Example                                        | Description                                      | Guide                                                                                                                                                                                                                |
| ---------------------------------------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [minimal-bot.js](minimal-bot.js)               | Login + `!ping` → Pong                           | `/v/latest/guides/basic-bot`                                                                                                                                                   |
| [first-steps-bot.js](first-steps-bot.js)       | !ping, !hello, !avatar, !embed, !perms           | `/v/latest/guides/basic-bot`, `/v/latest/guides/profile-urls`, `/v/latest/guides/permissions` |
| [ping-bot.js](ping-bot.js)                     | Prefix commands, embeds, DMs, voice, audio/video | `/v/latest/guides/basic-bot`, `/v/latest/guides/voice`                                                                                       |
| [reaction-bot.js](reaction-bot.js)             | Simple reaction handling                         | `/v/latest/guides/reactions`                                                                                                                                                   |
| [reaction-roles-bot.js](reaction-roles-bot.js) | Reaction-based role assignment                   | `/v/latest/guides/reactions`                                                                                                                                                   |
| [webhook-bot.js](webhook-bot.js)               | Webhook-based bot (no gateway)                   | `/v/latest/guides/webhooks`                                                                                                                                                     |
| [webi-bot.js](webi-bot.js)                     | Full webhook demo: embeds, files, all options    | `/v/latest/guides/webhook-attachments-embeds`                                                                                                               |
| [moderation-bot.js](moderation-bot.js)         | Ban, kick, unban, !perms (permissions)           | `/v/latest/guides/permissions`, `/v/latest/guides/moderation`                                                                         |

## Environment Variables

| Variable                          | Required               | Description                                  |
| --------------------------------- | ---------------------- | -------------------------------------------- |
| `FLUXER_BOT_TOKEN`                | Yes (for gateway bots) | Bot token from the Fluxer developer portal   |
| `FLUXER_SUPPRESS_DEPRECATION`     | No                     | Set to `1` to silence deprecation warnings   |
| `FLUXER_API_URL`                  | No                     | Custom API base URL                          |
| `VOICE_DEBUG`                     | No                     | Set to `1` for voice connection logs         |
| `FLUXER_VIDEO_FFMPEG`             | No                     | Set to `1` for FFmpeg video decoding (macOS) |
| `REACTION_ROLES_MESSAGE_ID`       | No                     | Message ID for reaction roles                |
| `REACTION_ROLES_CHANNEL_ID`       | No                     | Channel ID for reaction roles                |
| `ROLE_GAMING`, `ROLE_MUSIC`, etc. | No                     | Role IDs for reaction roles emoji mapping    |

## Documentation

Full API reference: https://erin.js.org (or run `pnpm run docs:dev` and open `http://localhost:3333` for local docs).
