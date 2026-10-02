import { z } from "zod";
import {
  BookSchema,
  CreateBookSchema,
  IdParamsSchema,
  ListBooksQuerySchema,
  UpdateBookSchema,
} from "@/lib/schemas";
import { registerRoute } from "../register";

const BookParams = IdParamsSchema("bookId", "book_things_fall_apart");

registerRoute({
  method: "get",
  path: "/api/v1/books",
  tag: "Books",
  summary: "List books",
  description: "Filter by genre or part of the title. Public, no token needed.",
  query: ListBooksQuerySchema,
  response: z.array(BookSchema),
});

registerRoute({
  method: "post",
  path: "/api/v1/books",
  tag: "Books",
  summary: "Add a book",
  auth: true,
  body: CreateBookSchema,
  response: BookSchema,
  additionalErrors: { 404: "The author does not exist" },
});

registerRoute({
  method: "get",
  path: "/api/v1/books/{bookId}",
  tag: "Books",
  summary: "Get a book",
  params: BookParams,
  response: BookSchema,
});

registerRoute({
  method: "patch",
  path: "/api/v1/books/{bookId}",
  tag: "Books",
  summary: "Update a book",
  description: "Send only the fields that change.",
  auth: true,
  params: BookParams,
  body: UpdateBookSchema,
  response: BookSchema,
});

registerRoute({
  method: "delete",
  path: "/api/v1/books/{bookId}",
  tag: "Books",
  summary: "Delete a book",
  auth: true,
  params: BookParams,
});
