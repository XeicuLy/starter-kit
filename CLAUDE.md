# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **starter-kit** repository: the template store referenced by the `xeikit new` CLI (see [XeicuLy/create-app-cli](https://github.com/XeicuLy/create-app-cli)). The CLI fetches `manifest.json` to list available templates, then downloads the matching `templates/<id>/` directory to scaffold a new project. As the project grows, update this file with build commands, architecture notes, and conventions.

## Repository Structure

- `manifest.json` — template metadata (`id`/`name`/`description`) consumed by the CLI; each `id` must match a directory name under `templates/`
- `templates/` — project template files
  - `tanstack-start-hono-cf/` — TanStack Start + Hono (Cloudflare Workers) template (planned; contents added incrementally starting with [#3](https://github.com/XeicuLy/starter-kit/issues/3))

## Notes

- There are no build tools, package managers, or test frameworks configured yet.
- When tooling is added (e.g., `package.json`, `Makefile`, `pyproject.toml`), document the relevant commands here under a "Commands" section.
