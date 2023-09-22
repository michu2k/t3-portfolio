import {z} from "zod";

type ExperienceItemFormValues = z.infer<typeof experienceItemSchema>;

const experienceItemResponsibilitySchema = z.object({
  id: z.string().optional(),
  name: z.string()
});

const experienceItemSchema = z.object({
  position: z.string().min(3, "Position name must be at least 3 characters long"),
  company: z.string().min(3, "Company name must be at least 3 characters long"),
  startDate: z.date().nullable().optional(),
  endDate: z.date().nullable().optional(),
  responsibilities: z.array(experienceItemResponsibilitySchema)
});

export type {ExperienceItemFormValues};

export {experienceItemSchema};
