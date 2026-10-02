import { z } from "zod";
import { CreateOrderSchema, IdParamsSchema, OrderSchema } from "@/lib/schemas";
import { registerRoute } from "../register";

registerRoute({
  method: "get",
  path: "/api/v1/orders",
  tag: "Orders",
  summary: "List orders",
  auth: true,
  response: z.array(OrderSchema),
});

registerRoute({
  method: "post",
  path: "/api/v1/orders",
  tag: "Orders",
  summary: "Place an order",
  description: "Takes the quantity out of stock and prices the order in naira.",
  auth: true,
  body: CreateOrderSchema,
  response: OrderSchema,
  additionalErrors: { 404: "The book does not exist", 409: "Not enough in stock" },
});

registerRoute({
  method: "get",
  path: "/api/v1/orders/{orderId}",
  tag: "Orders",
  summary: "Get an order",
  auth: true,
  params: IdParamsSchema("orderId", "ord_1a2b3c"),
  response: OrderSchema,
});
