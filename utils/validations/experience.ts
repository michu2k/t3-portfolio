import {isBefore} from "date-fns";
import {z} from "zod";

type ExperienceItemFormValues = z.infer<typeof experienceItemSchema>;

const experienceItemResponsibilitySchema = z.object({
  id: z.string().optional(),
  name: z.string().max(128, "Name is too long")
});

const experienceItemSchema = z
  .object({
    id: z.string().optional(),
    position: z.string().min(3, "Position name must be at least 3 characters long").max(128, "Name is too long"),
    company: z.string().min(3, "Company name must be at least 3 characters long").max(128, "Name is too long"),
    startDate: z.date({required_error: "Start date is required"}),
    endDate: z.date().nullable().optional(),
    responsibilities: z.array(experienceItemResponsibilitySchema)
  })
  .superRefine(({startDate, endDate}, ctx) => {
    if (endDate && isBefore(endDate, startDate)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["endDate"],
        message: "End date must be set after start date"
      });

      return z.NEVER;
    }
  });

export type {ExperienceItemFormValues};

export {experienceItemSchema};
