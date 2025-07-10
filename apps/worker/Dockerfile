FROM node:23-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS builder
WORKDIR /app
RUN pnpm add -g turbo@^2.5.4
COPY . .
RUN turbo prune worker --docker 

FROM base AS installer
WORKDIR /app
COPY --from=builder /app/out/json/ .
RUN pnpm install --frozen-lockfile
COPY --from=builder /app/out/full/ .
RUN pnpm turbo run build
RUN pnpm turbo run db:generate

FROM base AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 worker
USER worker

COPY --from=installer /app/apps/worker/dist /app/apps/worker/dist
COPY --from=installer /app/apps/worker/package.json /app/apps/worker/package.json
COPY --from=installer /app/apps/worker/node_modules /app/apps/worker/node_modules

COPY --from=installer /app/packages/database/dist /app/packages/database/dist
COPY --from=installer /app/packages/database/package.json /app/packages/database/package.json
COPY --from=installer /app/packages/database/node_modules /app/packages/database/node_modules
COPY --from=installer /app/packages/database/prisma /app/packages/database/prisma

COPY --from=installer /app/packages/shared/dist /app/packages/shared/dist
COPY --from=installer /app/packages/shared/package.json /app/packages/shared/package.json
COPY --from=installer /app/packages/shared/node_modules /app/packages/shared/node_modules

COPY --from=installer /app/packages/redis/dist /app/packages/redis/dist
COPY --from=installer /app/packages/redis/package.json /app/packages/redis/package.json
COPY --from=installer /app/packages/redis/node_modules /app/packages/redis/node_modules

COPY --from=installer /app/node_modules /app/node_modules

CMD ["node", "apps/worker/dist/index.js"]