import { notFound, ok, parseWith, readJson, requireToken } from "@/lib/http";
import { UpdateBookSchema } from "@/lib/schemas";
import { books } from "@/lib/store";

type Context = { params: Promise<{ bookId: string }> };

export async function GET(_request: Request, { params }: Context) {
  const { bookId } = await params;
  const book = books.find((candidate) => candidate.id === bookId);
  return book ? ok(book) : notFound("Book");
}

export async function PATCH(request: Request, { params }: Context) {
  const unauthorised = requireToken(request);
  if (unauthorised) return unauthorised;

  const { bookId } = await params;
  const book = books.find((candidate) => candidate.id === bookId);
  if (!book) return notFound("Book");

  const body = parseWith(UpdateBookSchema, await readJson(request));
  if (body.error) return body.error;

  Object.assign(book, body.data);
  return ok(book);
}

export async function DELETE(request: Request, { params }: Context) {
  const unauthorised = requireToken(request);
  if (unauthorised) return unauthorised;

  const { bookId } = await params;
  const index = books.findIndex((candidate) => candidate.id === bookId);
  if (index === -1) return notFound("Book");

  books.splice(index, 1);
  return new Response(null, { status: 204 });
}
