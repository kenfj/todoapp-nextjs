# Next.js SPA with App Router

* c.f. https://zenn.dev/hiromu617/articles/1ed6811dc6cf26

## Quick Start

```bash
# start dev frontend (with Spring Boot backend)
pnpm dev

# or start dev with mock backend
pnpm dev-with-mock

# or build and start static frontend with mock backend
pnpm start-with-mock

# http://localhost:3000
```

## Setup

```bash
pnpm dlx create-next-app@latest

# update next.config.js for SPA
# output: 'export'

pnpm run dev

pnpm run build

# package.json "start" is updated as "serve out" because of this error.
# Error: "next start" does not work with "output: export" configuration.
# Use "npx serve@latest out" instead.

pnpm run start
# http://localhost:3000

# or using python
# python -m http.server --directory out 3000
```

## Upgrade Packages

```bash
pnpm outdated
pnpm update --latest
```

## Mock Backend

* https://github.com/typicode/json-server

```bash
pnpm mock-backend

curl http://localhost:8080/todos
```

## E2E Test

* https://playwright.dev/docs/intro
* https://playwright.dev/docs/getting-started-vscode

```bash
# add basic setup
pnpm create playwright

# install browser
pnpm exec playwright install

# equivalent to pnpm exec playwright test
pnpm run test:e2e

# other sample commands
pnpm exec playwright test --ui
pnpm exec playwright test --project=chromium
pnpm exec playwright test example
pnpm exec playwright test --debug
pnpm exec playwright codegen
```

## Reference

* https://blog.ag-grid.com/full-row-editing-ag-grid-committing-changes-button-click/
