import { OpenApiGeneratorV31 } from "@asteasolutions/zod-to-openapi";
import { registry } from "./registry";

const TAGS = [
  { name: "Health", description: "Is the API up?" },
  { name: "Books", description: "The books the shop sells." },
  { name: "Authors", description: "Who wrote them." },
  { name: "Orders", description: "Buying books. Every route needs the token." },
];

// `x-tagGroups` is what turns the flat tag list into folders in Scalar's sidebar.
const TAG_GROUPS = [
  { name: "Getting started", tags: ["Health"] },
  { name: "Catalogue", tags: ["Books", "Authors"] },
  { name: "Shop", tags: ["Orders"] },
];

// Markdown headings here become their own pages at the top of the sidebar.
const DESCRIPTION = `
A sample bookshop API, built to show what a Scalar docs site looks like. Every endpoint is real: open one and press **Test Request** to call it.

## Authentication

Reads are public. Writes and everything under **Orders** need a bearer token. The demo token \`demo-token\` is already filled in, so you can call protected routes straight away. Clear it to see the 401.

## Responses

Success: \`{ "success": true, "data": … }\`. Error: \`{ "success": false, "error": { "code", "message", "details?" } }\`.

## Demo data

Data lives in memory. Writes work, but the store resets whenever the server restarts.
`.trim();

type OpenApiDocument = ReturnType<OpenApiGeneratorV31["generateDocument"]>;

let cachedDocument: OpenApiDocument | null = null;

export function getOpenApiDocument(): OpenApiDocument {
  cachedDocument ??= {
    ...new OpenApiGeneratorV31(registry.definitions).generateDocument({
      openapi: "3.1.0",
      info: { title: "Bookshop API", version: "1.0.0", description: DESCRIPTION },
      servers: [{ url: "/", description: "This deployment" }],
      tags: TAGS,
    }),
    "x-tagGroups": TAG_GROUPS,
  };
  return cachedDocument;
}
