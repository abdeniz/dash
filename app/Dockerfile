# Development stage
FROM oven/bun:1 AS dev
WORKDIR /app/app

# Copy root tsconfig to parent directory (needed by app tsconfig extends)
COPY tsconfig.json /app/tsconfig.json

# Copy app files
COPY app/package.json app/bun.lockb* ./
RUN bun install

COPY app/ ./

EXPOSE 3000
CMD ["bun", "run", "dev", "--host", "0.0.0.0"]

# Production build stage
FROM oven/bun:1 AS build
WORKDIR /app/app

# Copy root tsconfig to parent directory (needed by app tsconfig extends)
COPY tsconfig.json /app/tsconfig.json

# Copy app package files
COPY app/package.json app/bun.lockb* ./
RUN bun install

# Copy app source
COPY app/ ./
RUN bun run build

# Production stage - run Nitro server
FROM oven/bun:1 AS prod
WORKDIR /app/app

# Copy the built output from build stage
COPY --from=build /app/app/.output /app/app/.output

# Copy drizzle migrations and config
COPY --from=build /app/app/drizzle /app/app/drizzle
COPY --from=build /app/app/drizzle.config.ts /app/app/drizzle.config.ts
COPY --from=build /app/app/package.json /app/app/package.json

# Create data directory
RUN mkdir -p /app/app/data

EXPOSE 80

# Run migrations and start server
ENV PORT=80
ENV HOST=0.0.0.0
CMD ["sh", "-c", "bunx drizzle-kit migrate && bun .output/server/index.mjs"]
