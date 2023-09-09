import {SnippetType} from "@prisma/client";
import {z} from "zod";

const snippetSchema = z.object({
  id: z.string().optional(),
  type: z.nativeEnum(SnippetType, {
    required_error: "Snippet type is required"
  }),
  name: z.string().min(3, "Name must be at least 3 characters long"),
  value: z.string().min(3, "Value must be at least 3 characters long")
});

export {snippetSchema};