import {z} from "zod";
import type {FileObj} from "~/utils/file";

type ProjectItemFormValues = z.infer<typeof projectItemSchema>;

const projectItemSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, "Name must be at least 3 characters long").max(128, "Name is too long"),
  description: z.string().min(3, "Description must be at least 3 characters long"),
  shortDescription: z.string().max(640, "Description is too long").nullable().optional(),
  image: z
    .custom<FileObj>()
    .optional()
    .refine((file) => !!file, {message: "Image is required"}),
  coverImage: z
    .custom<FileObj>()
    .optional()
    .refine((file) => !!file, {message: "Cover image is required"})
});

export type {ProjectItemFormValues};

export {projectItemSchema};
