# CLAUDE.md (apps/backend)

Hono + `@hono/zod-openapi` API running on Cloudflare Workers. This file documents the
feature-based layered architecture convention used here, so that both humans and AI agents
add new endpoints consistently.

Reference: https://zenn.dev/ashunar0/articles/1ba94a110d8622

## Directory structure

Features are organized by **domain, not by technical layer** — there is no top-level
`routes/` / `services/` / `repositories/` split. Each domain owns its own vertical slice:

```
src/
├── index.ts              # app bootstrap: mounts middleware and feature routers
├── middleware/            # cross-cutting Hono middleware (cors, etc.)
├── schema/                # schemas shared ACROSS features (e.g. error responses)
│   └── error.ts
└── features/
    └── <domain>/
        ├── index.ts       # HTTP entry point: route definition (createRoute) + handler
        ├── service.ts     # business logic
        ├── repository.ts  # DB/external data access (only added once a feature needs one)
        └── schema.ts       # schemas local to this feature (request/response shapes)
```

## Layer responsibilities

- **`index.ts`**: the HTTP boundary. Defines the route (path, method, OpenAPI metadata,
  request/response schemas) via `createRoute`, and wires the handler. Talks only to
  `service.ts`. Contains no business logic or data access.
- **`service.ts`**: domain rules. Combines one or more repositories, applies business logic,
  computes defaults. Contains no HTTP concerns (no `ctx`, no status codes).
- **`repository.ts`**: thin wrapper around DB/external calls. All queries live here — no raw
  query strings should leak into `service.ts`. **Not created until a feature actually needs
  persistence or an external data source** — don't add an empty stub ahead of need.
- **`schema.ts`**: zod schemas. Feature-local files live in `features/<domain>/schema.ts`.
  Schemas reused by multiple features (e.g. a generic error response) go in `src/schema/`
  instead of being duplicated per feature.

## Dependency direction

```
index.ts → service.ts → repository.ts
```

One-way only — a lower layer must never import from a higher one (e.g. `service.ts` must
not import anything from `index.ts`). `schema.ts` is cross-cutting and may be imported by
any layer within its own feature.

## Conventions

- Export feature routers and functions with named exports (`export const health = ...`),
  matching the rest of the codebase — do not switch to default exports.
- A feature's mounted Hono sub-app is exported as the domain name itself (e.g. `health`,
  not `healthRouteHandler`), and mounted in `src/index.ts` via `app.route('/', health)`.
