import { notFound, ok, parseWith, readJson, requireToken } from "@/lib/http";
import { CreateBookSchema, ListBooksQuerySchema } from "@/lib/schemas";
import { authors, books } from "@/lib/store";

export function GET(request: Request) {
  const query = parseWith(
    ListBooksQuerySchema,
    Object.fromEntries(new URL(request.url).searchParams),
  );
  if (query.error) return query.error;

  const { genre, search, limit } = query.data;
  const matches = books.filter(
    (book) =>
      (!genre || book.genre === genre) &&
      (!search || book.title.toLowerCase().includes(search.toLowerCase())),
  );
  return ok(matches.slice(0, limit));
}

export async function POST(request: Request) {
  const unauthorised = requireToken(request);
  if (unauthorised) return unauthorised;

  const body = parseWith(CreateBookSchema, await readJson(request));
  if (body.error) return body.error;
  if (!authors.some((author) => author.id === body.data.authorId)) {
    return notFound("Author");
  }

  const book = { id: `book_${crypto.randomUUID().slice(0, 8)}`, ...body.data };
  books.push(book);
  return ok(book, 201);
}
