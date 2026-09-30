# UCSC DevFest

A Bun and Turborepo monorepo for the UCSC DevFest project.

## Workspace

- `apps/web` — Next.js frontend
- `apps/backend` — Convex backend
- `packages/ui` — shared UI components
- `packages/typescript-config` — shared TypeScript configuration

## Getting started

```bash
bun install
bun dev
```

The web app runs at [http://localhost:3000](http://localhost:3000). Convex reads its local configuration from `apps/backend/.env.local`.

## Commands

```bash
bun dev          # start workspace development servers
bun run build    # build all buildable workspaces
bun run lint     # check formatting and lint rules
bun run format   # format the repository
bun run check-types
```
