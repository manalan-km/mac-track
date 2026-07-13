# mac-track

A TypeScript monorepo for tracking macros. Built with Turborepo and pnpm workspaces.

## Apps

- `@mactrack/rest-api` - Fastify REST API
- `@mactrack/discord-bot` - Discord bot
- `@mactrack/cli` - Command-line interface

## Packages

- `@mac-track/utils` - Shared utilities used across apps

## Requirements

- Node.js >= 18
- pnpm 9

## Setup

```bash
pnpm install
```

## Development

```bash
pnpm dev
```

Run a specific app:

```bash
pnpm dev --filter=@mactrack/rest-api
pnpm dev --filter=@mactrack/discord-bot
pnpm dev --filter=@mactrack/cli
```

## Build

```bash
pnpm build
```

## Docker

```bash
docker compose up
```

## Other Commands

```bash
pnpm lint          # lint all packages
pnpm check-types   # typecheck all packages
pnpm format        # format with prettier
```

## Stack

- TypeScript
- Turborepo
- pnpm workspaces
- Fastify
- Docker
