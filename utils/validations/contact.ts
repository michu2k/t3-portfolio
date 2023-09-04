import {ContactMethodType} from "@prisma/client";
import {z} from "zod";

const contactMethodSchema = z.object({
  id: z.string().optional(),
  type: z.nativeEnum(ContactMethodType),
  name: z.string().min(3),
  description: z.string().min(3)
});

const contactFormSchema = z.object({
  description: z.string().optional()
});

export {
  contactMethodSchema,
  contactFormSchema
};