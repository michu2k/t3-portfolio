import {z} from "zod";

type HeaderSnippetsFormValues = z.infer<typeof headerSnippetsSchema>;

const headerSnippetsSchema = z.object({
  heading: z.string().optional(),
  description: z.string().optional()
});

export type {HeaderSnippetsFormValues};

export {headerSnippetsSchema};
