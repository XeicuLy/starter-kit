# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **starter-kit** repository: the template store referenced by the `xeikit new` CLI (see [XeicuLy/create-app-cli](https://github.com/XeicuLy/create-app-cli)). The CLI fetches `manifest.json` to list available templates, then downloads the matching `templates/<id>/` directory to scaffold a new project. As the project grows, update this file with build commands, architecture notes, and conventions.

## Repository Structure

- `manifest.json` — template metadata (`id`/`name`/`description`) consumed by the CLI; each `id` must match a directory name under `templates/`
- `templates/` — project template files
  - `tanstack-start-hono-cf/` — TanStack Start + Hono (Cloudflare Workers) template (planned; contents added incrementally starting with [#3](https://github.com/XeicuLy/starter-kit/issues/3))

## Commands

- `pnpm release` — run the release script (`scripts/release.ts`): bumps the `version` field in root `package.json`, generates `CHANGELOG.md` via `changelogen`, commits/tags/pushes, and creates a GitHub Release.
  - `pnpm release [patch|minor|major]` — specify the bump type explicitly; if omitted outside CI, you'll be prompted to select one.
  - `pnpm release --ci [patch|minor|major]` — CI mode (also triggered when the `CI` or `GITHUB_ACTIONS` env var is exactly `"true"`): skips the git-clean/branch checks, and auto-infers the bump type from conventional commit messages since the last version tag when not specified.
  - `pnpm release --dry-run` — log the actions that would be taken without touching files, git, or GitHub; also skips the git-clean/branch checks.
  - Outside of `--ci`/`--dry-run`, must be run from a clean working tree on `main`.

## Notes

- There are no test frameworks configured yet.
