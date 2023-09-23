import {z} from "zod";

type SocialMediaItemFormValues = z.infer<typeof socialMediaItemSchema>;

const socialMediaItemSchema = z.object({
  url: z.string().url("URL must be a valid URL"),
  iconName: z.string().min(3, "Name must be at least 3 characters long")
});

export type {SocialMediaItemFormValues};

export {socialMediaItemSchema};
