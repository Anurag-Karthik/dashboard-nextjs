# -------- Base Image --------
FROM node:20-alpine AS base
WORKDIR /app

# -------- Dependencies --------
FROM base AS deps

COPY package.json pnpm-lock.yaml ./
RUN corepack enable
RUN pnpm install --frozen-lockfile

# -------- Build --------
FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN corepack enable
RUN pnpm build

# -------- Production --------
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

RUN addgroup -S nodejs
RUN adduser -S nextjs -G nodejs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

CMD ["node_modules/.bin/next","start"]