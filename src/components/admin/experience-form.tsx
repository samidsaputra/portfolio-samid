"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { experienceSchema, type ExperienceFormValues } from "@/lib/validations/experience";
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ExperienceFormProps {
  initialData?: any;
  onSuccess?: () => void;
}

export function ExperienceForm({ initialData, onSuccess }: ExperienceFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Derived state to track if "currently working here" is checked
  // If no end_date, it means "Present"
  const [isPresent, setIsPresent] = useState(!initialData?.end_date && !!initialData);

  const form = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      role: initialData?.role || "",
      institution: initialData?.institution || "",
      start_date: initialData?.start_date ? new Date(initialData.start_date).toISOString().split('T')[0] : "",
      end_date: initialData?.end_date ? new Date(initialData.end_date).toISOString().split('T')[0] : "",
      description: initialData?.description || "",
      display_order: initialData?.display_order || 0,
    },
  });

  async function onSubmit(data: ExperienceFormValues) {
    setIsLoading(true);

    try {
      // If "Present" is checked, we set end_date to null
      const payload = {
        ...data,
        end_date: isPresent || !data.end_date ? null : data.end_date,
      };

      if (initialData) {
        // Update existing
        const { error: updateError } = await supabase
          .from("experiences")
          .update(payload)
          .eq("id", initialData.id);
        
        if (updateError) throw updateError;
      } else {
        // Insert new
        const { error: insertError } = await supabase
          .from("experiences")
          .insert(payload);
        
        if (insertError) throw insertError;
      }

      toast.success(initialData ? "Experience updated successfully" : "Experience created successfully");
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role / Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Senior Frontend Engineer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="institution"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company / Institution</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Google" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="end_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Input 
                          type="date" 
                          {...field} 
                          disabled={isPresent}
                          className={isPresent ? "opacity-50" : ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center gap-2 pt-2">
                  <Switch 
                    id="is-present" 
                    checked={isPresent}
                    onCheckedChange={(checked) => {
                      setIsPresent(checked);
                      if (checked) form.setValue("end_date", "");
                    }}
                  />
                  <label htmlFor="is-present" className="text-sm font-medium">
                    I currently work here
                  </label>
                </div>
              </div>
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe your responsibilities and achievements..." className="min-h-[120px]" {...field} />
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
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>Lower numbers appear first</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={isLoading} className="rounded-full px-8 h-12 bg-accent-monochrome text-accent-dark font-semibold hover:bg-accent-monochrome/90 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(200,243,29,0.5)]">
                {isLoading ? "Saving..." : "Save Experience"}
              </Button>
            </div>
          </form>
        </Form>
    </div>
  );
}
