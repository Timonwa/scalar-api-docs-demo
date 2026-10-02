import { z } from "zod";
import { registerRoute } from "./register";

registerRoute({
  method: "get",
  path: "/api/v1/health",
  tag: "Health",
  summary: "Check the API is up",
  response: z.object({ status: z.literal("ok"), time: z.iso.datetime() }),
});
