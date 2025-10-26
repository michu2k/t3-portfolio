import { z } from "zod";

import type { FileObj } from "~/utils/file";

export type ProjectItemFormValues = z.infer<typeof projectItemSchema>;

export const projectItemSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, "Name must be at least 3 characters long").max(128, "Name is too long"),
  shortDescription: z.string().max(640, "Description is too long").optional(),
  description: z.string().min(3, "Description must be at least 3 characters long"),
  websiteUrl: z.url("URL is not valid").or(z.literal("")).optional(),
  image: z.custom<FileObj>((file) => !!file, { message: "Image is required" }).nullable(),
  coverImage: z.custom<FileObj>((file) => !!file, { message: "Cover image is required" }).nullable()
});
