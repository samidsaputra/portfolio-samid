"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { techStackSchema, TechStackFormValues } from "@/lib/validations/tech-stack";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface TechStackFormProps {
  initialData?: TechStackFormValues & { id?: number };
}

export function TechStackForm({ initialData }: TechStackFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const supabase = createClient();

  const form = useForm<TechStackFormValues>({
    resolver: zodResolver(techStackSchema),
    defaultValues: {
      name: initialData?.name || "",
    },
  });

  function onSubmit(values: TechStackFormValues) {
    startTransition(async () => {
      try {
        if (initialData?.id) {
          const { error } = await supabase
            .from("tech_stacks")
            .update(values)
            .eq("id", initialData.id);

          if (error) throw error;
        } else {
          const { error } = await supabase
            .from("tech_stacks")
            .insert([values]);

          if (error) throw error;
        }

        toast.success(`Tech Stack ${initialData ? "updated" : "created"} successfully`);
        router.push("/admin/tech-stacks");
        router.refresh();
      } catch (error: any) {
        toast.error(error.message || "Something went wrong");
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-md">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Next.js" disabled={isPending} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {initialData ? "Save Changes" : "Create Tech Stack"}
        </Button>
      </form>
    </Form>
  );
}
