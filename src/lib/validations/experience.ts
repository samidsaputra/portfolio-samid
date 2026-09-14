import { z } from "zod";

export const experienceSchema = z.object({
  role: z.string().min(1, "Role is required"),
  institution: z.string().min(1, "Institution is required"),
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().optional().or(z.literal('')), // empty means "Present"
  description: z.string().optional(),
  display_order: z.coerce.number().int().default(0),
});

export type ExperienceFormValues = z.infer<typeof experienceSchema>;
