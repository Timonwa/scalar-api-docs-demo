import { notFound, ok, requireToken } from "@/lib/http";
import { orders } from "@/lib/store";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ orderId: string }> },
) {
  const unauthorised = requireToken(request);
  if (unauthorised) return unauthorised;

  const { orderId } = await params;
  const order = orders.find((candidate) => candidate.id === orderId);
  return order ? ok(order) : notFound("Order");
}
