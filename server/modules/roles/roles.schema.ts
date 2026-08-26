import { z } from "zod";

export const getRoleSchema = z.object({
  params: z.object({ id: z.string().uuid() }),
});
