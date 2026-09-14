import * as z from "zod";

export const profileSchema = z.object({
  full_name: z.string().min(2, "Full name must be at least 2 characters"),
  tagline: z.string().optional().or(z.literal("")),
  about_text: z.string().optional().or(z.literal("")),
  photo_url: z.string().optional().or(z.literal("")),
  cv_url: z.string().optional().or(z.literal("")),
  linkedin_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  github_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  email: z.string().email("Must be a valid email").optional().or(z.literal("")),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
