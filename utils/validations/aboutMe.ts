import {z} from "zod";

type AboutMeSnippetsFormValues = z.infer<typeof aboutMeSnippetsSchema>;

const aboutMeSnippetsSchema = z.object({
  description: z.string().optional()
});

export type {AboutMeSnippetsFormValues};

export {aboutMeSnippetsSchema};
