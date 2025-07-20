import { z } from "zod";

export type SocialMediaLinkFormValues = z.infer<typeof socialMediaLinkSchema>;

export const socialMediaLinkSchema = z.object({
  id: z.string().optional(),
  url: z.string().url("Provided URL is not valid"),
  icon: z.string({
    required_error: "Select social media icon"
  })
});
