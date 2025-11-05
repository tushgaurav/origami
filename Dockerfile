FROM oven/bun:alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json bun.lockb* bun.lock* ./
RUN bun install --no-save --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV DATABASE_PATH="file:./origami.db"
RUN bunx drizzle-kit push
RUN bun run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME="0.0.0.0" \
    DATABASE_PATH="file:/data/origami.db"

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs && \
    mkdir -p /data && \
    chown -R nextjs:nodejs /data

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy the template database (with schema but no data)
COPY --from=builder --chown=nextjs:nodejs /app/origami.db /app/template.db

USER nextjs
EXPOSE 3000

VOLUME ["/data"]

# Initialize database from template if it doesn't exist, then start server
CMD sh -c "if [ ! -f /data/origami.db ]; then cp /app/template.db /data/origami.db; fi && bun run ./server.js"