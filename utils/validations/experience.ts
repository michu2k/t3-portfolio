import { isBefore } from "date-fns";
import { z } from "zod";

export type ExperienceItemFormValues = z.infer<typeof experienceItemSchema>;

export const experienceItemSchema = z
  .object({
    id: z.string().optional(),
    position: z.string().min(3, "Position name must be at least 3 characters long").max(128, "Name is too long"),
    company: z.string().min(3, "Company name must be at least 3 characters long").max(128, "Name is too long"),
    startDate: z.date({ error: "Start date is required" }),
    endDate: z.date().nullable().optional(),
    responsibilities: z.array(
      z.object({
        id: z.string().optional(),
        name: z.string().max(256, "Name is too long")
      })
    )
  })
  .superRefine(({ startDate, endDate }, ctx) => {
    if (endDate && isBefore(endDate, startDate)) {
      ctx.addIssue({
        code: "custom",
        path: ["endDate"],
        message: "End date must be set after start date"
      });

      return z.NEVER;
    }
  });
