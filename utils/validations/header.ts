import {z} from "zod";
import type {FileObj} from "../file";

type HeaderSnippetsFormValues = z.infer<typeof headerSnippetsSchema>;

const headerSnippetsSchema = z.object({
  heading: z.string().min(3, "Heading must be at least 3 characters long"),
  description: z.string().optional(),
  image: z
    .custom<FileObj>()
    .optional()
    .refine((file) => !!file, {message: "Image is required"})
});

export type {HeaderSnippetsFormValues};

export {headerSnippetsSchema};
