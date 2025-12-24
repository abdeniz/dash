# Development stage
FROM oven/bun:1 AS dev
WORKDIR /app

COPY package.json bun.lockb* ./
RUN bun install

COPY . .

EXPOSE 3000
CMD ["bun", "run", "dev", "--host", "0.0.0.0"]

# Production build stage
FROM oven/bun:1 AS build
WORKDIR /app

# Copy root tsconfig (needed by frontend tsconfig extends)
COPY tsconfig.json ./

# Copy widgets directory (referenced by frontend tsconfig paths)
COPY widgets/ ./widgets/

# Copy server directory (referenced by frontend tsconfig paths for Eden client)
COPY server/ ./server/

# Copy frontend package files
COPY frontend/package.json frontend/bun.lockb* ./frontend/
WORKDIR /app/frontend
RUN bun install

# Copy frontend source
COPY frontend/ ./
RUN bun run build

# Production stage - run Nitro server
FROM oven/bun:1 AS prod
WORKDIR /app/frontend

# Copy the built output from build stage
COPY --from=build /app/frontend/.output /app/frontend/.output

EXPOSE 80

# Run the Nitro server
ENV PORT=80
ENV HOST=0.0.0.0
CMD ["bun", ".output/server/index.mjs"]
