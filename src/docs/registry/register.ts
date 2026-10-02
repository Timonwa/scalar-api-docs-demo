import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import "@/lib/schemas";

// The shared registry and the one helper every folder's registrations call,
// so each route adds the standard envelope and error responses the same way.

export const registry = new OpenAPIRegistry();

const BEARER_AUTH = registry.registerComponent("securitySchemes", "BearerAuth", {
  type: "http",
  scheme: "bearer",
  description: "Use the demo token `demo-token`.",
});

const ErrorResponseSchema = z
  .object({
    success: z.literal(false),
    error: z.object({
      code: z.string().openapi({ example: "VALIDATION_ERROR" }),
      message: z.string(),
      details: z.unknown().optional(),
    }),
  })
  .openapi("ErrorResponse");

const JSON_ERROR = { "application/json": { schema: ErrorResponseSchema } };

export interface RouteDefinition {
  method: "get" | "post" | "patch" | "delete";
  path: string;
  tag: string;
  summary: string;
  description?: string;
  auth?: boolean;
  params?: z.ZodObject;
  query?: z.ZodObject;
  body?: z.ZodType;
  /** The `data` field of the success envelope. */
  response?: z.ZodType;
  successStatus?: number;
  additionalErrors?: Record<number, string>;
}

export function registerRoute({
  method,
  path,
  tag,
  summary,
  description,
  auth = false,
  params,
  query,
  body,
  response,
  successStatus = method === "post" ? 201 : method === "delete" ? 204 : 200,
  additionalErrors = {},
}: RouteDefinition): void {
  registry.registerPath({
    method,
    path,
    tags: [tag],
    summary,
    description,
    ...(auth && { security: [{ [BEARER_AUTH.name]: [] }] }),
    request: {
      params,
      query,
      ...(body && { body: { content: { "application/json": { schema: body } } } }),
    },
    responses: {
      ...(successStatus === 204
        ? { 204: { description: "No content" } }
        : {
            [successStatus]: {
              description: "Success",
              content: {
                "application/json": {
                  schema: z.object({
                    success: z.literal(true),
                    data: response ?? z.object({}),
                  }),
                },
              },
            },
          }),
      ...((body || query) && {
        400: { description: "Validation error", content: JSON_ERROR },
      }),
      ...(auth && { 401: { description: "Missing or wrong token", content: JSON_ERROR } }),
      ...(params && { 404: { description: "Not found", content: JSON_ERROR } }),
      ...Object.fromEntries(
        Object.entries(additionalErrors).map(([status, text]) => [
          status,
          { description: text, content: JSON_ERROR },
        ]),
      ),
    },
  });
}
