import { ApiReference } from "@scalar/nextjs-api-reference";
import { DEMO_API_TOKEN } from "@/lib/http";

// The Scalar page: it fetches the OpenAPI document and renders the reference,
// including the Test Request client that calls this same deployment.
export const GET = ApiReference({
  url: "/docs/openapi.json",
  pageTitle: "Bookshop API",
  layout: "modern",
  theme: "purple",
  defaultOpenAllTags: true,
  authentication: {
    preferredSecurityScheme: "BearerAuth",
    securitySchemes: { BearerAuth: { token: DEMO_API_TOKEN } },
  },
});
