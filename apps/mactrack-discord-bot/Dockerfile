FROM node:24-alpine
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY turbo.json ./

COPY packages/utils ./packages/utils
COPY apps/mactrack-discord-bot apps/mactrack-discord-bot

ENV BASE_URL="http://api:3000/"
RUN corepack enable && pnpm install --frozen-lockfile
RUN pnpm turbo build --filter=@mactrack/discord-bot

RUN pnpm start 
