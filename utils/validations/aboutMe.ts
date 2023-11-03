import {z} from "zod";
import type {FileObj} from "../file";

type AboutMeSnippetsFormValues = z.infer<typeof aboutMeSnippetsSchema>;

const aboutMeSnippetsSchema = z.object({
  description: z.string().optional(),
  image: z.custom<FileObj>().optional()
});

export type {AboutMeSnippetsFormValues};

export {aboutMeSnippetsSchema};
