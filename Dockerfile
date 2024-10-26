FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build-time arguments
ARG REVALIDATION_KEY
ARG PAYLOAD_SECRET
ARG NEXT_PRIVATE_DRAFT_SECRET
ARG NEXT_PRIVATE_REVALIDATION_KEY
ARG PAYLOAD_PUBLIC_DRAFT_SECRET



# Environment variables needed at build time

ENV NEXT_PUBLIC_IS_LIVE=""
ENV NEXT_PUBLIC_SERVER_URL=""
ENV PAYLOAD_PUBLIC_SERVER_URL=""
ENV PAYLOAD_CONFIG_PATH=src/payload.config.ts
ENV NEXT_TELEMETRY_DISABLED=1

RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

# Runtime environment variables
ENV DATABASE_URI=""
ENV PAYLOAD_SECRET=""
ENV PAYLOAD_CONFIG_PATH=src/payload.config.ts
ENV NEXT_PRIVATE_DRAFT_SECRET=""
ENV NEXT_PRIVATE_REVALIDATION_KEY=""
ENV PAYLOAD_PUBLIC_DRAFT_SECRET=""
ENV PAYLOAD_PUBLIC_SERVER_URL=""
ENV REVALIDATION_KEY=""
ENV S3_ACCESS_KEY_ID=""
ENV S3_BUCKET=""
ENV S3_ENDPOINT=""
ENV S3_REGION=""
ENV S3_SECRET_ACCESS_KEY=""

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
RUN mkdir .next
RUN chown nextjs:nodejs .next
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
