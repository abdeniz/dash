# Dash

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](/LICENSE)

> A modern, extensible homelab dashboard for system and media widgets, built with Tanstack Start and ElysiaJS

![widgets](widgets.gif)

---

## Features

- 🧩 Drag-and-drop, resizable widgets
- ⚡ Real-time system and media data (system info, \*rr suite etc.)
- 🧑‍💻 Full-stack monorepo: Tanstack Start + ElysiaJS
- 🧱 Provider pattern for easy widget extension
- 🎨 Responsive, themeable UI (Tailwind CSS, shadcn)
- 🛠️ One-command widget sync: `bun sync` auto-generates files and updates registries from a single extendable YAML source

## Architecture

```
dash/
├── server/   # ElysiaJS
├── web/      # Tanstack Start
├── widgets/  # Shared widget definitions/types
```

- **Backend:** ElysiaJS, provider registry for widget data, SQLite via Drizzle ORM
- **Frontend:** Tanstack Start, drag-drop grid, widget/component mapping
- **Shared:** Widget definitions and types in `widgets/` for type-safe cross-package use

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (for both server and web)

### Install dependencies

```bash
# At repo root
bun install
cd server && bun install
cd web && bun install
```

### Run the backend (Elysia/Bun)

```bash
cd server
bun run dev
# Server runs at http://localhost:3003
```

### Run the frontend (React/Vite)

```bash
cd web
bun run dev
# App runs at http://localhost:3000
```

## Adding or Syncing Widgets

1. **Edit the registry:**
   - Add or update widget definitions in [`widgets/registry.yaml`](widgets/registry.yaml) (type, label, category, layout, config, etc).

2. **Sync widgets:**
   - From the repo root, run:
     ```bash
     bun sync
     ```
   - (This runs the sync-widgets script for you.)
   - This will:
   - Generate or update provider stubs in `server/src/providers/widgets/`
   - Regenerate the provider registry in `server/src/providers/index.ts`
   - Generate or update frontend component stubs in `web/src/widgets/<type>/<type>.tsx`
   - Regenerate widget definitions in `widgets/src/definitions.ts`
   - All code and mappings stay in sync with your YAML source of truth.

3. **Implement logic/UI:**
   - Fill in the generated provider/component stubs as needed for your widget's functionality.

**Tip:** The sync script uses [chalk](https://www.npmjs.com/package/chalk) for styled output and will warn you about missing files or successful generations.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
