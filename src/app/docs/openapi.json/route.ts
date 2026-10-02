import { getOpenApiDocument } from "@/docs/openapi";

export function GET() {
  return Response.json(getOpenApiDocument());
}
