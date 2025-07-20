import { ContactMethodType } from "@prisma/client";
import { z } from "zod";

export type ContactMethodFormValues = z.infer<typeof contactMethodSchema>;

export type ContactSnippetsFormValues = z.infer<typeof contactSnippetsSchema>;

export const contactMethodSchema = z.object({
  id: z.string().optional(),
  type: z.nativeEnum(ContactMethodType, {
    required_error: "Select contact method type"
  }),
  name: z.string().min(3, "Name must be at least 3 characters long").max(128, "Name is too long"),
  description: z.string().min(3, "Description must be at least 3 characters long").max(640, "Description is too long")
});

export const contactSnippetsSchema = z.object({
  description: z.string().max(640, "Description is too long").optional()
});
