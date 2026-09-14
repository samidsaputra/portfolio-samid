import { z } from "zod";

export const certificateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  issuer: z.string().min(1, "Issuer is required"),
  issue_date: z.string().min(1, "Issue date is required"),
  certificate_url: z.string().url("Must be a valid URL").optional().or(z.literal('')),
  image_url: z.string().url("Must be a valid URL").optional().or(z.literal('')),
  display_order: z.coerce.number().int().default(0),
});

export type CertificateFormValues = z.infer<typeof certificateSchema>;
