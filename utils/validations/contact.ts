import {ContactMethodType} from "@prisma/client";
import {z} from "zod";

type ContactMethodFormValues = z.infer<typeof contactMethodSchema>;

const contactMethodSchema = z.object({
  type: z.nativeEnum(ContactMethodType, {
    required_error: "Contact method type is required"
  }),
  name: z.string().min(3, "Name must be at least 3 characters long"),
  description: z.string().min(3, "Description must be at least 3 characters long")
});

type ContactSnippetsFormValues = z.infer<typeof contactSnippetsSchema>;

const contactSnippetsSchema = z.object({
  description: z.string().optional()
});

export type {ContactMethodFormValues, ContactSnippetsFormValues};

export {contactMethodSchema, contactSnippetsSchema};
