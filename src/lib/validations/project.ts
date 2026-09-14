import * as z from "zod";

export const projectSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters").regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
  description: z.string().max(150, "Description should be short and scannable (max 150 characters)").optional().or(z.literal("")),
  thumbnail_url: z.string().optional().or(z.literal("")),
  demo_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  github_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  ambient_color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Must be a valid hex color code"),
  display_order: z.coerce.number().int().default(0),
  is_featured: z.boolean().default(false),
  tech_stacks: z.array(z.number()).default([]),
}).refine(data => data.demo_url || data.github_url, {
  message: "Either Demo URL or GitHub URL must be provided",
  path: ["demo_url"],
});

export type ProjectFormValues = z.infer<typeof projectSchema>;
