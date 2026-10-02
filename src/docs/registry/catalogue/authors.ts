import { z } from "zod";
import { AuthorSchema, BookSchema, IdParamsSchema } from "@/lib/schemas";
import { registerRoute } from "../register";

registerRoute({
  method: "get",
  path: "/api/v1/authors",
  tag: "Authors",
  summary: "List authors",
  response: z.array(AuthorSchema),
});

registerRoute({
  method: "get",
  path: "/api/v1/authors/{authorId}",
  tag: "Authors",
  summary: "Get an author with their books",
  params: IdParamsSchema("authorId", "auth_chinua"),
  response: AuthorSchema.extend({ books: z.array(BookSchema) }),
});
