import {ContactMethodType} from "@prisma/client";
import {z} from "zod";

type ContactMethodFormValues = z.infer<typeof contactMethodSchema>;

type ContactSnippetsFormValues = z.infer<typeof contactSnippetsSchema>;

const contactMethodSchema = z.object({
  id: z.string().optional(),
  type: z.nativeEnum(ContactMethodType, {
    required_error: "Select contact method type"
  }),
  name: z.string().min(3, "Name must be at least 3 characters long").max(64, "Name is too long"),
  description: z.string().min(3, "Description must be at least 3 characters long").max(480, "Description is too long")
});

const contactSnippetsSchema = z.object({
  description: z.string().max(480, "Description is too long").optional()
});

export type {ContactMethodFormValues, ContactSnippetsFormValues};

export {contactMethodSchema, contactSnippetsSchema};
