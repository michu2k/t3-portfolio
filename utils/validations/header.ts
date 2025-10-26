import { z } from "zod";

export type HeaderSnippetsFormValues = z.infer<typeof headerSnippetsSchema>;

export const headerSnippetsSchema = z.object({
  heading: z.string().min(3, "Heading must be at least 3 characters long").max(128, "Heading is too long"),
  description: z.string().max(640, "Description is too long").optional()
});
