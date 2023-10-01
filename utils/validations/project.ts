import {z} from "zod";

type ProjectItemFormValues = z.infer<typeof projectItemSchema>;

const projectItemSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, "Name must be at least 3 characters long"),
  description: z.string().min(3, "Description must be at least 3 characters long"),
  shortDescription: z.string().min(3, "Description must be at least 3 characters long"),
  image: z.string(),
  coverImage: z.string()
});

export type {ProjectItemFormValues};

export {projectItemSchema};
