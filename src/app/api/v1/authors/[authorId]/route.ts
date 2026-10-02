import { notFound, ok } from "@/lib/http";
import { authors, books } from "@/lib/store";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ authorId: string }> },
) {
  const { authorId } = await params;
  const author = authors.find((candidate) => candidate.id === authorId);
  if (!author) return notFound("Author");
  return ok({
    ...author,
    books: books.filter((book) => book.authorId === authorId),
  });
}
