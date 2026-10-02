import { errorResponse, notFound, ok, parseWith, readJson, requireToken } from "@/lib/http";
import { CreateOrderSchema } from "@/lib/schemas";
import { books, orders } from "@/lib/store";

export function GET(request: Request) {
  const unauthorised = requireToken(request);
  if (unauthorised) return unauthorised;
  return ok(orders);
}

export async function POST(request: Request) {
  const unauthorised = requireToken(request);
  if (unauthorised) return unauthorised;

  const body = parseWith(CreateOrderSchema, await readJson(request));
  if (body.error) return body.error;

  const book = books.find((candidate) => candidate.id === body.data.bookId);
  if (!book) return notFound("Book");
  if (book.inStock < body.data.quantity) {
    return errorResponse(409, "OUT_OF_STOCK", `Only ${book.inStock} left in stock`);
  }

  book.inStock -= body.data.quantity;
  const order = {
    id: `ord_${crypto.randomUUID().slice(0, 8)}`,
    ...body.data,
    totalNaira: book.priceNaira * body.data.quantity,
    status: "pending" as const,
    createdAt: new Date().toISOString(),
  };
  orders.push(order);
  return ok(order, 201);
}
