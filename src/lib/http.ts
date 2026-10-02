import type { z } from "zod";

// Every response shares one envelope, mirrored by the docs' shared schemas.

export const DEMO_API_TOKEN = "demo-token";

export function ok<T>(data: T, status = 200) {
  return Response.json({ success: true, data }, { status });
}

export function errorResponse(
  status: number,
  code: string,
  message: string,
  details?: unknown,
) {
  return Response.json(
    { success: false, error: { code, message, ...(details ? { details } : {}) } },
    { status },
  );
}

export const notFound = (what: string) =>
  errorResponse(404, "NOT_FOUND", `${what} not found`);

/** Returns a 401 response when the bearer token is missing or wrong, else null. */
export function requireToken(request: Request): Response | null {
  const header = request.headers.get("authorization") ?? "";
  if (header === `Bearer ${DEMO_API_TOKEN}`) return null;
  return errorResponse(
    401,
    "UNAUTHORISED",
    `Send "Authorization: Bearer ${DEMO_API_TOKEN}"`,
  );
}

type Parsed<T> = { data: T; error: null } | { data: null; error: Response };

export function parseWith<T extends z.ZodType>(
  schema: T,
  input: unknown,
): Parsed<z.infer<T>> {
  const result = schema.safeParse(input);
  if (result.success) return { data: result.data, error: null };
  return {
    data: null,
    error: errorResponse(400, "VALIDATION_ERROR", "Invalid request", result.error.issues),
  };
}

export async function readJson(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    return undefined;
  }
}
