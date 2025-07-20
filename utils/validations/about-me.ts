import { z } from "zod";

import type { FileObj } from "../file";

export type AboutMeSnippetsFormValues = z.infer<typeof aboutMeSnippetsSchema>;

export const aboutMeSnippetsSchema = z.object({
  description: z.string().max(640, "Description is too long").optional(),
  image: z.custom<FileObj>().optional()
});
