# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (port 3000)
npm run build        # TypeScript check + Vite build
npm run lint         # TypeScript check + ESLint --fix (zero warnings allowed)
```

Node version: v20.11.1 (see .nvmrc)

## Architecture

React 18 + TypeScript frontend for a learning platform, built with Vite.

**State Management**: React Context API (AuthContext, AppContext) - not Redux

**Routing**: React Router v6
- `/` - Dashboard
- `/course/:id` - Course content
- `/admin` - Admin panel (protected route)
- `/login`, `/reset-password` - Auth pages

**Styling**: Bootstrap 5 + SCSS (`src/styles/`)

**Backend**: Firebase for auth, custom API via `src/utils/utils.ts` request helper

**Error Tracking**: Sentry

## Code Standards

ESLint with Airbnb + Prettier. Key enforced rules:
- Import ordering with path groups (assets, components, contexts, hooks, etc.) - alphabetically sorted
- Single component per file
- No unused variables/imports
- Import cycle max depth: 1
- Arrow functions: avoid parens for single params (`x => x` not `(x) => x`)

Path alias: `src/*` maps to `./src/*`

## Testing

Jest with tests in `src/components/tests/`. Shared utilities in `home-test-utils.js`.

## Environment

Copy `.env.example` and configure Firebase credentials + `VITE_API_DOMAIN` for the backend API.

## Make sure to:
- Run `npm run lint` after making changes
