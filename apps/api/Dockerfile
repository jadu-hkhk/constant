FROM node:23-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS builder
WORKDIR /app
RUN pnpm -g add turbo@^2.5.4
COPY . .
RUN turbo prune api --docker

FROM base AS installer
WORKDIR /app
COPY --from=builder /app/out/json/ .
RUN pnpm install --frozen-lockfile
COPY --from=builder /app/out/full/ .
RUN pnpm turbo run build

RUN  pnpm turbo run db:generate

FROM base AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 api
USER api
    
COPY --from=installer /app/apps/api/dist /app/apps/api/dist
COPY --from=installer /app/apps/api/package.json /app/apps/api/package.json
COPY --from=installer /app/apps/api/node_modules /app/apps/api/node_modules

COPY --from=installer /app/packages/shared/dist /app/packages/shared/dist
COPY --from=installer /app/packages/shared/package.json /app/packages/shared/package.json
COPY --from=installer /app/packages/shared/node_modules /app/packages/shared/node_modules

COPY --from=installer /app/packages/database/src /app/packages/database/src
COPY --from=installer /app/packages/database/prisma /app/packages/database/prisma
COPY --from=installer /app/packages/database/dist /app/packages/database/dist
COPY --from=installer /app/packages/database/package.json /app/packages/database/package.json
COPY --from=installer /app/packages/database/node_modules /app/packages/database/node_modules

COPY --from=installer /app/node_modules /app/node_modules

CMD ["node", "apps/api/dist/bin.js"]