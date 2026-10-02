import { ok } from "@/lib/http";
import { authors } from "@/lib/store";

export function GET() {
  return ok(authors);
}
