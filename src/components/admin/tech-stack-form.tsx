"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { techStackSchema, type TechStackFormValues } from "@/lib/validations/tech-stack";
import { createBrowserClient } from "@supabase/ssr";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TechStackFormProps {
  initialData?: any;
  onSuccess?: () => void;
}

export function TechStackForm({ initialData, onSuccess }: TechStackFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const form = useForm<TechStackFormValues>({
    resolver: zodResolver(techStackSchema),
    defaultValues: {
      name: initialData?.name || "",
    },
  });

  async function onSubmit(data: TechStackFormValues) {
    setIsLoading(true);

    try {
      if (initialData) {
        // Update existing
        const { error: updateError } = await supabase
          .from("tech_stacks")
          .update(data)
          .eq("id", initialData.id);
        
        if (updateError) throw updateError;
      } else {
        // Insert new
        const { error: insertError } = await supabase
          .from("tech_stacks")
          .insert(data);
        
        if (insertError) throw insertError;
      }

      toast.success(initialData ? "Tech Stack updated successfully" : "Tech Stack created successfully");
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
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Next.js, PostgreSQL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={isLoading} className="rounded-full px-8 h-12 bg-accent-monochrome text-accent-dark font-semibold hover:bg-accent-monochrome/90 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(200,243,29,0.5)]">
                {isLoading ? "Saving..." : "Save Tech Stack"}
              </Button>
            </div>
          </form>
        </Form>
    </div>
  );
}
