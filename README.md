# Bookshop API: a Scalar docs demo

A small working API with its documentation rendered by [Scalar](https://scalar.com). Every endpoint in the docs is live, so **Test Request** on any page calls the real API and shows the real response.

**Live docs:** [scalar-api-docs-demo.vercel.app/docs](https://scalar-api-docs-demo.vercel.app/docs) · **Source:** [github.com/Timonwa/scalar-api-docs-demo](https://github.com/Timonwa/scalar-api-docs-demo)

## What it shows

- **Docs generated from code.** The OpenAPI document is built from the same Zod schemas the endpoints validate with, so the docs cannot drift from what the API accepts.
- **Folders in the sidebar.** Endpoints are grouped into folders (Getting started → Health, Catalogue → Books and Authors, Shop → Orders) through the `x-tagGroups` extension. The registration files in `src/docs/registry/` use the same folders.
- **Testing endpoints from the docs.** Open any endpoint and press **Test Request**. Reads are public. Writes and **Orders** need a bearer token, and the demo token `demo-token` is prefilled, so protected routes work straight away. Clear the token to see the 401.
- **Guide pages.** The headings in the API description (Authentication, Responses, Demo data) appear as their own pages at the top of the sidebar.

## Quickstart

```bash
pnpm install
pnpm dev
```

| URL                                                        | What it is                       |
| ---------------------------------------------------------- | -------------------------------- |
| [`/docs`](http://localhost:3000/docs)                      | the Scalar API reference         |
| [`/docs/openapi.json`](http://localhost:3000/docs/openapi.json) | the OpenAPI document behind it   |
| [`/api/v1/books`](http://localhost:3000/api/v1/books)      | the API itself                   |

## How it fits together

```txt
src/
  app/api/v1/…              the API: Next.js route handlers
  app/docs/route.ts         the Scalar page (theme, layout, prefilled token)
  app/docs/openapi.json/    serves the generated OpenAPI document
  docs/openapi.ts           API title, description, tags and sidebar folders
  docs/registry/            one file per endpoint group, in the same folders as the sidebar
  lib/schemas.ts            Zod schemas used by the handlers and the docs
  lib/store.ts              in-memory seed data
```

To add an endpoint, write its handler under `src/app/api/v1/`, then register it in the matching file under `src/docs/registry/`. The docs pick it up on the next request.

Data lives in memory. Writes work, but they reset when the server restarts, and on Vercel each serverless instance keeps its own copy.

## Using Scalar with Laravel

Scalar only needs an OpenAPI document, so the backend language does not matter. In Laravel, a package such as [Scramble](https://scramble.dedoc.co) generates the document from your routes and form requests, and Scalar's [Laravel package](https://github.com/scalar/laravel) (`composer require scalar/laravel`) serves the reference page. The sidebar folders come from the same `x-tagGroups` key shown in `src/docs/openapi.ts`.

## Deploy

Import the repository in [Vercel](https://vercel.com/new), or run `vercel` from this folder. It needs no environment variables.
