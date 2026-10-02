import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

// Must run before any schema below calls `.openapi()`.
extendZodWithOpenApi(z);

// The same schemas validate requests in the route handlers and describe them
// in the docs, so the reference cannot drift from what the API accepts.

export const AuthorSchema = z
  .object({
    id: z.string().openapi({ example: "auth_chinua" }),
    name: z.string().openapi({ example: "Chinua Achebe" }),
    country: z.string().openapi({ example: "Nigeria" }),
  })
  .openapi("Author");

export const BookSchema = z
  .object({
    id: z.string().openapi({ example: "book_things_fall_apart" }),
    title: z.string().openapi({ example: "Things Fall Apart" }),
    authorId: z.string().openapi({ example: "auth_chinua" }),
    genre: z.enum(["fiction", "non-fiction", "poetry"]),
    priceNaira: z.number().int().nonnegative().openapi({ example: 8500 }),
    inStock: z.number().int().nonnegative().openapi({ example: 12 }),
  })
  .openapi("Book");

export const CreateBookSchema = BookSchema.omit({ id: true }).openapi(
  "CreateBook",
);

export const UpdateBookSchema = CreateBookSchema.partial().openapi(
  "UpdateBook",
);

export const ListBooksQuerySchema = z.object({
  genre: BookSchema.shape.genre.optional(),
  search: z
    .string()
    .optional()
    .openapi({ description: "Matches part of the title", example: "fall" }),
  limit: z.coerce.number().int().min(1).max(50).default(10),
});

export const OrderSchema = z
  .object({
    id: z.string().openapi({ example: "ord_1a2b3c" }),
    bookId: z.string(),
    quantity: z.number().int().positive(),
    totalNaira: z.number().int().nonnegative(),
    status: z.enum(["pending", "paid", "cancelled"]),
    createdAt: z.iso.datetime(),
  })
  .openapi("Order");

export const CreateOrderSchema = z
  .object({
    bookId: z.string().openapi({ example: "book_things_fall_apart" }),
    quantity: z.number().int().positive().max(10).openapi({ example: 2 }),
  })
  .openapi("CreateOrder");

export const IdParamsSchema = (name: string, example: string) =>
  z.object({ [name]: z.string().openapi({ example }) });

export type Author = z.infer<typeof AuthorSchema>;
export type Book = z.infer<typeof BookSchema>;
export type Order = z.infer<typeof OrderSchema>;
