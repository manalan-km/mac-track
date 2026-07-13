FROM node:24-alpine
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY turbo.json ./

COPY packages/utils ./packages/utils
COPY apps/mactrack-rest-api apps/mactrack-rest-api

RUN corepack enable && pnpm install --frozen-lockfile
RUN pnpm turbo build --filter=@mactrack/utils
RUN pnpm turbo build --filter=@mactrack/rest-api

CMD ["pnpm","start"]
