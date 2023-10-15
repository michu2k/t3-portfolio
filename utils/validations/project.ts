import {z} from "zod";
import type {FileObj} from "~/utils/file";

type ProjectItemFormValues = z.infer<typeof projectItemSchema>;

const projectItemSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, "Name must be at least 3 characters long"),
  description: z.string().min(3, "Description must be at least 3 characters long"),
  shortDescription: z.string().optional(),
  image: z.custom<FileObj>().refine((file) => !!file, {message: "Image is required"}),
  coverImage: z.custom<FileObj>().refine((file) => !!file, {message: "Cover image is required"})
});

export type {ProjectItemFormValues};

export {projectItemSchema};
