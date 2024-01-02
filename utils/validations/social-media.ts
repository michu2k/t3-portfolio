import {z} from "zod";

type SocialMediaLinkFormValues = z.infer<typeof socialMediaLinkSchema>;

const socialMediaLinkSchema = z.object({
  id: z.string().optional(),
  url: z.string().url("Provided URL is not valid"),
  icon: z.string({
    required_error: "Select social media icon"
  })
});

export type {SocialMediaLinkFormValues};

export {socialMediaLinkSchema};
