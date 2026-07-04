# TanStack Start + Hono (Cloudflare Workers)

[TanStack Start](https://tanstack.com/start) と [Hono](https://hono.dev/) を組み合わせ、Cloudflare Workers 上で動作させるためのスターターテンプレートです。

## 構成

pnpm ワークスペースによるモノリポ構成です。

- `apps/frontend` — TanStack Start によるフロントエンド
- `apps/backend` — Hono による Cloudflare Workers 上のバックエンド API

## セットアップ

```bash
pnpm install
```

`pnpm-lock.yaml` はテンプレートに含まれていないため、`pnpm install` 実行後に生成されたロックファイルをコミットしてください。CI（`.github/workflows/ci.yaml`）は `pnpm install --frozen-lockfile` を使用するため、ロックファイルが存在しない状態で PR を作成すると CI が失敗します。

## 開発

```bash
pnpm dev
```

フロントエンド・バックエンドを同時に起動します。個別に起動する場合は `pnpm dev:frontend` / `pnpm dev:backend` を使用してください。

## デプロイ

Cloudflare Workers へのデプロイには [wrangler](https://developers.cloudflare.com/workers/wrangler/) を使用します。`.env.example` を参考に、`CLOUDFLARE_ACCOUNT_ID` と `CLOUDFLARE_API_TOKEN` を環境変数として設定してください。

```bash
wrangler deploy
```

## Lint / Format

Biome が JS/TS の formatter と linter を担い、ESLint は React Hooks のルールチェックのみを行います。CSS/JSON/YAML などは Prettier が対象です。

```bash
pnpm lint       # eslint + biome + prettier のチェック
pnpm lint:fix   # 上記の自動修正
```

## CI

`.github/workflows/ci.yaml` が Pull Request 作成時に `eslint:ci` → `biome:ci` → `prettier:ci` → `typecheck` を順に実行します（Draft PR ではスキップされます）。Node.js / pnpm のセットアップは `.github/actions/node-install` の composite action に切り出されており、バージョンは入力で上書きできます。
