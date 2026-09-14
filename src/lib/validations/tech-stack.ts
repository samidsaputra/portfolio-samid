import * as z from "zod";

export const techStackSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export type TechStackFormValues = z.infer<typeof techStackSchema>;
