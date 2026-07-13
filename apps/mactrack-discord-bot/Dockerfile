FROM node:24-alpine
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY turbo.json ./

COPY packages/utils ./packages/utils
COPY apps/mactrack-discord-bot apps/mactrack-discord-bot

RUN corepack enable && pnpm install --frozen-lockfile
RUN pnpm turbo build --filter=@mactrack/discord-bot

CMD ["node", "apps/mactrack-discord-bot/build/main.js"]
