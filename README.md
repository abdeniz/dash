# Dash

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](/LICENSE)

> A delightful, self-hosted homelab dashboard for system and media widgets, built with TanStack Start

![widgets](widgets.gif)

---

## Features

- 🧩 Drag-and-drop, resizable widgets
- ⚡ Real-time system and media data (system info, \*rr suite etc.)
- 📦 Standalone full-stack app powered by TanStack Start
- 🗄️ Embedded SQLite database (single-file, zero-config persistence)
- 🐳 Fully containerized with Docker support
- 🧱 Provider pattern for easy widget extension
- 🛠️ One-command widget sync: `bun sync` auto-generates files and updates registries from a single extendable YAML source

## Architecture

```
dash/
├── app/              # Standalone full-stack application
│   ├── src/
│   │   ├── server/   # TanStack Start server functions & providers
│   │   ├── widgets/  # Widget components & definitions
│   │   ├── routes/   # TanStack Router routes
│   │   └── ...       # Components, hooks, stores, etc.
│   ├── drizzle/      # SQLite migrations
│   └── data/         # SQLite database storage (volume-mounted in Docker)
├── scripts/          # Build & sync utilities
└── docker-compose.yml
```

- **Full-Stack Runtime:** TanStack Start with Nitro server (SSR-capable React framework)
- **Database:** Embedded SQLite via Drizzle ORM (single `.db` file, no external dependencies)
- **Frontend:** TanStack Router, drag-drop/resize grid, real-time widget updates
- **Deployment:** Single Docker container, volume-persisted database, hot-reloadable in dev

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) runtime (v1.0+)
- Docker & Docker Compose (optional, for containerized deployment)

### Local Development

```bash
# Install dependencies
cd app
bun install

# Run database migrations
bun drizzle-kit migrate

# Start development server with hot reload
bun run dev
# App runs at http://localhost:3000
```

The app uses an embedded SQLite database stored in `app/data/dash.db` by default.

### Docker Deployment

#### Production (single container)

```bash
# Build and run the production container
docker-compose up -d

# App runs at http://localhost:80
# Database is persisted in named volume 'dash-data'
```

#### Development (with hot reload)

```bash
# Run development container with live code reloading
docker-compose -f docker-compose.dev.yml up

# App runs at http://localhost:3000
# Local code changes are mounted into the container
```

## Adding or Syncing Widgets

1. **Edit the registry:**
   - Add or update widget definitions in [`widget-registry.yaml`](widget-registry.yaml) (type, label, category, layout, config schema, etc.)

   **Example widget definition:**

   ```yaml
   - type: radarr
     label: Radarr
     category: media
     layout: { minW: 4, minH: 4, maxW: 9, maxH: 6 }
     config:
       url:
         type: string
         required: true
         label: URL
         secret: false
       apiKey:
         type: string
         required: true
         secret: true
         label: API Key
       docker:
         type: string
         required: false
         label: Docker Container
   ```

   - **Config field types:** `string`, `number`
   - **Required vs optional:** Set `required: true` for mandatory fields, `false` for optional
   - **Secrets:** Set `secret: true` for sensitive fields (API keys, passwords)

2. **Sync widgets:**
   - From the repo root, run:
     ```bash
     bun sync
     ```
   - This will:
     - Generate missing provider stubs in `app/src/server/providers/widgets/`
     - Regenerate the provider registry in `app/src/server/providers/index.gen.ts`
     - Generate missing widget component stubs in `app/src/widgets/<type>/<type>.tsx`
     - Regenerate widget definitions in `app/src/widgets/definitions.gen.ts`
   - All code and mappings stay in sync with your YAML source of truth

3. **Implement logic/UI:**
   - **Server providers:** Implement data fetching logic in `app/src/server/providers/widgets/<Type>Provider.ts`
   - **Client components:** Build the UI in `app/src/widgets/<type>/<type>.tsx`
   - **Type safety:** TanStack Start automatically provides end-to-end type safety between server functions and client code

**Example provider pattern:**

```typescript
// app/src/server/providers/widgets/CpuProvider.ts
export class CpuProvider implements IWidgetProvider {
  async getValue(config: any) {
    const cpuData = await si.currentLoad();
    return { usage: cpuData.currentLoad };
  }
}
```

## Database Management

The app uses SQLite with Drizzle ORM for schema management:

```bash
cd app

# Generate a new migration after schema changes
bun drizzle-kit generate

# Apply migrations
bun drizzle-kit migrate

# Open Drizzle Studio for database inspection
bun drizzle-kit studio
```

Schema is defined in [app/src/db/schema.ts](app/src/db/schema.ts). Migrations are stored in `app/drizzle/`.

## Configuration

All configuration is optional with sensible defaults. The app works out-of-the-box with zero configuration.

**Optional environment variables:**

- `DB_FILE_NAME` - SQLite database path (default: `./data/dash.db`)

The Docker production image sets additional variables, but these are handled automatically by the container and don't need manual configuration.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
