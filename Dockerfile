# Use Node.js 20 as the base image
FROM node:20.9.0-alpine AS base

# Install pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Files needed for installing dependencies
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --no-frozen-lockfile
RUN pnpm install --ignore-workspace

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Copy dependencies and source code
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Environment variables needed for build
ENV NODE_ENV=production
ENV PAYLOAD_CONFIG_PATH=src/payload.config.ts

# Generate Payload types and build
RUN pnpm generate:types
RUN pnpm build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PAYLOAD_CONFIG_PATH=src/payload.config.ts

# Copy necessary files for production
COPY package.json pnpm-lock.yaml ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src

# Create media directory for local storage (if needed as fallback)
RUN mkdir -p media
VOLUME /app/media

EXPOSE 3000

# Start the server using your dev:prod script
CMD ["pnpm", "start"]
