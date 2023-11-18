import {z} from "zod";
import type {FileObj} from "../file";

type HeaderSnippetsFormValues = z.infer<typeof headerSnippetsSchema>;

const headerSnippetsSchema = z.object({
  heading: z.string().min(3, "Heading must be at least 3 characters long").max(64, "Heading is too long"),
  description: z.string().max(480, "Description is too long").optional(),
  image: z.custom<FileObj>().optional()
});

export type {HeaderSnippetsFormValues};

export {headerSnippetsSchema};
