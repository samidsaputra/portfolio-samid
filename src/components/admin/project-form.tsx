"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema, type ProjectFormValues } from "@/lib/validations/project";
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
import { ImageUpload } from "@/components/shared/image-upload";

interface TechStack {
  id: string;
  name: string;
}

interface ProjectFormProps {
  initialData?: any; // any because it comes from Supabase join
  onSuccess?: () => void;
}

export function ProjectForm({ initialData, onSuccess }: ProjectFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [techStacks, setTechStacks] = useState<TechStack[]>([]);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      description: initialData?.description || "",
      thumbnail_url: initialData?.thumbnail_url || "",
      demo_url: initialData?.demo_url || "",
      github_url: initialData?.github_url || "",
      category: initialData?.category || "",
      is_featured: initialData?.is_featured || false,
      display_order: initialData?.display_order || 0,
      tech_stack_ids: initialData?.tech_stacks?.map((ts: any) => ts.id) || [],
    },
  });

  // Generate slug automatically when title changes if it's a new project
  useEffect(() => {
    if (!initialData) {
      const subscription = form.watch((value, { name }) => {
        if (name === "title" && value.title) {
          form.setValue("slug", value.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""));
        }
      });
      return () => subscription.unsubscribe();
    }
  }, [form, initialData]);

  // Fetch available tech stacks for the multiselect
  useEffect(() => {
    async function fetchTechStacks() {
      const { data } = await supabase.from("tech_stacks").select("id, name").order("name");
      if (data) setTechStacks(data);
    }
    fetchTechStacks();
  }, [supabase]);

  async function onSubmit(data: ProjectFormValues) {
    setIsLoading(true);

    try {
      const { tech_stack_ids, ...projectData } = data;

      let projectId = initialData?.id;

      if (initialData) {
        // Update existing
        const { error: updateError } = await supabase
          .from("projects")
          .update(projectData)
          .eq("id", initialData.id);
        
        if (updateError) throw updateError;
      } else {
        // Insert new
        const { data: newProject, error: insertError } = await supabase
          .from("projects")
          .insert(projectData)
          .select()
          .single();
        
        if (insertError) throw insertError;
        projectId = newProject.id;
      }

      // Sync Tech Stacks (delete all and re-insert)
      if (projectId) {
        await supabase.from("project_tech_stacks").delete().eq("project_id", projectId);
        
        if (tech_stack_ids && tech_stack_ids.length > 0) {
          const junctions = tech_stack_ids.map(ts_id => ({
            project_id: projectId,
            tech_stack_id: ts_id,
          }));
          const { error: junctionError } = await supabase.from("project_tech_stacks").insert(junctions);
          if (junctionError) throw junctionError;
        }
      }

      toast.success(initialData ? "Project updated successfully" : "Project created successfully");
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

  // Toggle tech stack selection
  const handleTechStackToggle = (id: string) => {
    const current = form.getValues("tech_stack_ids") || [];
    if (current.includes(id)) {
      form.setValue("tech_stack_ids", current.filter(t => t !== id), { shouldDirty: true });
    } else {
      form.setValue("tech_stack_ids", [...current, id], { shouldDirty: true });
    }
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Project Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="project-name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Web App, Mobile App" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Brief project description..." className="min-h-[100px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="demo_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Demo URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="github_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GitHub URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="thumbnail_url"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Project Thumbnail</FormLabel>
                    <FormControl>
                      <ImageUpload 
                        value={field.value || ""} 
                        onChange={field.onChange} 
                        label="Upload Thumbnail"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="is_featured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border border-border-custom p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Featured Project</FormLabel>
                    <FormDescription>
                      Featured projects appear at the top of the list.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Tech Stacks Selection */}
            <div>
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-base mb-4 block">Tech Stacks</label>
              <div className="flex flex-wrap gap-2">
                {techStacks.map((tech) => {
                  const isSelected = form.watch("tech_stack_ids")?.includes(tech.id);
                  return (
                    <button
                      key={tech.id}
                      type="button"
                      onClick={() => handleTechStackToggle(tech.id)}
                      className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                        isSelected 
                          ? "bg-text-primary text-white border-text-primary" 
                          : "bg-background border-border-custom text-text-secondary hover:border-text-primary"
                      }`}
                    >
                      {tech.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={isLoading} className="rounded-full px-8 h-12 bg-accent-monochrome text-accent-dark font-semibold hover:bg-accent-monochrome/90 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(200,243,29,0.5)]">
                {isLoading ? "Saving..." : "Save Project"}
              </Button>
            </div>
          </form>
        </Form>
    </div>
  );
}
