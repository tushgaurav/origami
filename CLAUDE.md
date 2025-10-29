# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Origami is a hackable, self-hosted, modern start page for homelabs. It provides a fast, minimal, and customizable landing page for managing homelab applications and bookmarks.

**Tech Stack:**
- Next.js 15 (App Router) with standalone output mode
- React 19
- TypeScript
- Bun runtime
- Drizzle ORM with libSQL (SQLite)
- Tailwind CSS 4
- Shadcn UI + Radix UI
- Biome for linting and formatting

## Development Commands

```bash
# Development
bun run dev              # Start Next.js dev server

# Build & Production
bun run build            # Build for production (creates standalone output)
bun run start            # Start production server

# Code Quality
bun run lint             # Run Biome linter checks
bun run format           # Format code with Biome

# Database
bun run migrate          # Run database migrations (db/migrations.ts)
```

## Docker Deployment

The project uses a multi-stage Dockerfile optimized for Bun:
- Built on `oven/bun:1` base image
- Uses Next.js standalone output mode
- Runs on port 3000 with hostname "0.0.0.0"
- Minimal runtime with `oven/bun:1-slim`

## Architecture & Code Organization

### Database Layer (`db/`)

- **Database**: SQLite via libSQL client, local file at `./origami.db`
- **ORM**: Drizzle ORM for type-safe queries
- **Schema** (`db/schema.ts`): Defines 5 main tables:
  - `user` - User accounts
  - `hl_items` - Homelab application entries (main applications)
  - `bookmark_categories` - Bookmark organization
  - `bookmarks` - User bookmarks with category relationships
  - `user_preferences` - Per-user settings (theme, button sizes, description visibility)

All tables include `created_at` and `updated_at` timestamps using SQLite's `CURRENT_TIMESTAMP`.

### App Structure (`app/`)

Next.js 15 App Router structure:
- **Root Layout** (`app/layout.tsx`): Sets up theme provider, toast notifications, Google Geist fonts
- **Home Page** (`app/page.tsx`): Main dashboard displaying applications and bookmarks
- **Settings** (`app/settings/`): Nested route for managing applications, bookmarks, and preferences

### Server Actions Pattern

Server actions are co-located with their UI components in `_components/[feature]/actions.ts`:
- Use Zod for validation
- Return `ActionState` interface: `{ ok: boolean, error?: string, issues?: Array<...> }`
- Always call `revalidatePath()` after mutations
- Actions are marked with `"use server"` directive

Example structure:
```typescript
interface ActionState {
  ok: boolean
  error?: string
  issues?: Array<{ message: string; path?: (string | number)[] }>
}
```

### Component Organization

**Main Feature Components** (`components/origami/`):
- `applications/` - Application cards/buttons with icon display
- `bookmarks/` - Bookmark links organized by category
- Each feature has: `index.tsx` (main), `command.tsx` (dialog), `empty.tsx` (empty state), `context.tsx` (state)

**UI Components** (`components/ui/`):
- Shadcn UI components (button, card, dialog, input, etc.)
- All styled with Tailwind CSS and class-variance-authority

**Base Components** (`components/base/`):
- `page.tsx` - Wrapper component for consistent page layout

### Icon System

Uses Simple Icons library loaded via custom loader (`lib/simple-icons-loader.tsx`):
- Icons stored as string format: `si:{icon-slug}` (e.g., `si:proxmox`)
- `SimpleIcon` component dynamically loads icons by slug
- Icon search available in application creation UI

### Utilities (`lib/`)

- `utils.ts` - Tailwind class merging with `cn()` helper
- `simple-icons-loader.tsx` - Dynamic Simple Icons loader
- `get-local-url.ts` - URL formatting for display
- `console-branding.tsx` - Client-side console branding

## Coding Standards (from .cursorrules)

### JavaScript/TypeScript
- Use `function` keyword for pure functions, omit semicolons
- Prefer interfaces over types, avoid enums (use maps)
- File structure: exported component, subcomponents, helpers, static content, types
- Use early returns for error handling (guard clauses)
- Omit curly braces for simple one-line conditionals

### React/Next.js
- Functional components with TypeScript interfaces
- Use `function` keyword, not `const`, for components
- Minimize `'use client'` - prefer React Server Components
- Wrap client components in Suspense with fallback
- Use Zod for form validation
- Handle expected errors as return values (not try/catch in Server Actions)

### Data Fetching & State
- Rely on Next.js App Router for state changes
- Server components fetch data directly via Drizzle queries
- User preferences queried per-page (e.g., `application_button_size`)

### Styling
- Mobile-first responsive design with Tailwind CSS
- Use Shadcn UI and Radix UI for components
- Optimize images: WebP, size data, lazy loading

## Key Features & Patterns

1. **Applications System**: Display homelab services with icons, URLs, and descriptions. Supports two button size modes (full cards or compact icons).

2. **Bookmarks System**: Organize links by categories. Similar dual-mode display (full/compact).

3. **User Preferences**: Stored in database, control UI presentation (button sizes, description visibility, theme).

4. **Theme Support**: Uses `next-themes` with system/light/dark modes via `ThemeProvider`.

5. **Command Palette**: Quick application/bookmark access via `cmdk` library.

6. **Toast Notifications**: User feedback via Sonner library.

## Testing & Quality

- Run `bun run lint` before commits
- Biome configured for Next.js and React domains
- Import organization handled automatically by Biome

## Common Patterns

### Creating a Server Action
1. Define Zod schema for validation
2. Create action function with `"use server"` directive
3. Return `ActionState` type
4. Call `revalidatePath()` after mutations
5. Use `formData` parameter for form submissions

### Adding a New Feature Page
1. Create route in `app/[feature]/`
2. Add server components for data fetching
3. Place client components in `_components/` with `"use client"`
4. Co-locate server actions in `actions.ts`
5. Add database schema changes if needed
