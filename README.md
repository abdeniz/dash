# Dash

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](/LICENSE)

> A modern, extensible homelab dashboard for system and media widgets, built with Tanstack Start and ElysiaJS

![widgets](widgets.gif)

---

## Features

- 🧩 Drag-and-drop, resizable widgets
- ⚡ Real-time system and media data (CPU, memory, network, Radarr, Sonarr, uptime, etc.)
- 🧑‍💻 Full-stack monorepo: Tanstack Start + ElysiaJS
- 🧱 Provider pattern for easy widget extension
- 🎨 Responsive, themeable UI (Tailwind CSS, shadcn)

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

## Extending Widgets

1. **Add a provider:** Implement `IWidgetProvider` in `server/src/providers/widgets/`
2. **Register provider:** Add to `server/src/providers/index.ts`
3. **Add frontend component:** Add React component to `web/src/widgets/` and update `componentMap` in `widget.tsx`
4. **Update definitions:** Add to `widgets/src/definitions.ts`

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
