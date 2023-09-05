import {ContactMethodType} from "@prisma/client";
import {z} from "zod";

const contactMethodSchema = z.object({
  id: z.string().optional(),
  type: z.nativeEnum(ContactMethodType, {
    required_error: "Contact method type is required"
  }),
  name: z.string().min(3, "Name must be at least 3 characters long"),
  description: z.string().min(3, "Description must be at least 3 characters long")
});

const contactFormSchema = z.object({
  description: z.string().optional()
});

export {
  contactMethodSchema,
  contactFormSchema
};