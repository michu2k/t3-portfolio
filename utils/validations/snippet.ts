import { z } from "zod";

import { SnippetType } from "~/prisma/generated/enums";

export const snippetSchema = z.object({
  id: z.string().optional(),
  type: z.literal(Object.values(SnippetType), {
    error: "Snippet type is required"
  }),
  name: z.string().min(3, "Name must be at least 3 characters long"),
  value: z.string()
});
