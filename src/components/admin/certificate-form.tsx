"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { certificateSchema, type CertificateFormValues } from "@/lib/validations/certificate";
import { createBrowserClient } from "@supabase/ssr";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ImageUpload } from "@/components/shared/image-upload";

interface CertificateFormProps {
  initialData?: any;
  onSuccess?: () => void;
}

export function CertificateForm({ initialData, onSuccess }: CertificateFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const form = useForm<z.input<typeof certificateSchema>>({
    resolver: zodResolver(certificateSchema) as any,
    defaultValues: {
      title: initialData?.title || "",
      issuer: initialData?.issuer || "",
      issue_date: initialData?.issue_date ? new Date(initialData.issue_date).toISOString().split('T')[0] : "",
      certificate_url: initialData?.certificate_url || "",
      image_url: initialData?.image_url || "",
      display_order: initialData?.display_order || 0,
    },
  });

  async function onSubmit(data: CertificateFormValues) {
    setIsLoading(true);

    try {
      if (initialData) {
        // Update existing
        const { error: updateError } = await supabase
          .from("certificates")
          .update(data)
          .eq("id", initialData.id);
        
        if (updateError) throw updateError;
      } else {
        // Insert new
        const { error: insertError } = await supabase
          .from("certificates")
          .insert(data);
        
        if (insertError) throw insertError;
      }

      toast.success(initialData ? "Certificate updated successfully" : "Certificate created successfully");
      router.refresh();
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit as any)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. AWS Certified Solutions Architect" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="issuer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Issuer</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Amazon Web Services" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="issue_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Issue Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="certificate_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Certificate Image</FormLabel>
                  <FormControl>
                    <ImageUpload 
                      value={field.value || ""} 
                      onChange={field.onChange} 
                      label="Upload Certificate Image"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="display_order"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display Order</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} value={Number(field.value)} />
                    </FormControl>
                    <FormDescription>Lower numbers appear first</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={isLoading} className="rounded-full px-8 h-12 bg-accent-monochrome text-accent-dark font-semibold hover:bg-accent-monochrome/90 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(200,243,29,0.5)]">
                {isLoading ? "Saving..." : "Save Certificate"}
              </Button>
            </div>
          </form>
        </Form>
    </div>
  );
}
