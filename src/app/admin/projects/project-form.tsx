"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema, ProjectFormValues } from "@/lib/validations/project";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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
import { Switch } from "@/components/ui/switch";

const AMBIENT_COLORS = [
  { label: "Zinc (Default)", value: "#52525B" },
  { label: "Amber", value: "#D97706" },
  { label: "Teal", value: "#0D9488" },
  { label: "Violet", value: "#7C3AED" },
  { label: "Indigo", value: "#6366F1" },
  { label: "Rose", value: "#E11D48" },
  { label: "Emerald", value: "#059669" },
];

interface ProjectFormProps {
  initialData?: ProjectFormValues & { id?: string; thumbnail_url?: string | null };
  techStacks: { id: number; name: string }[];
}

export function ProjectForm({ initialData, techStacks }: ProjectFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [uploadingImage, setUploadingImage] = useState(false);
  const supabase = createClient();

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      description: initialData?.description || "",
      thumbnail_url: initialData?.thumbnail_url || "",
      demo_url: initialData?.demo_url || "",
      github_url: initialData?.github_url || "",
      ambient_color: initialData?.ambient_color || "#52525B",
      display_order: initialData?.display_order || 0,
      is_featured: initialData?.is_featured || false,
      tech_stacks: initialData?.tech_stacks || [],
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploadingImage(true);
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = e.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("project-thumbnails")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from("project-thumbnails")
        .getPublicUrl(filePath);

      form.setValue("thumbnail_url", data.publicUrl);
      toast.success("Image uploaded successfully");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setUploadingImage(false);
    }
  };

  function onSubmit(values: ProjectFormValues) {
    startTransition(async () => {
      try {
        const { tech_stacks, ...projectData } = values;

        let projectId = initialData?.id;

        if (projectId) {
          // Update existing
          const { error: updateError } = await supabase
            .from("projects")
            .update(projectData)
            .eq("id", projectId);

          if (updateError) throw updateError;
        } else {
          // Insert new
          const { data, error: insertError } = await supabase
            .from("projects")
            .insert([projectData])
            .select()
            .single();

          if (insertError) throw insertError;
          projectId = data.id;
        }

        // Handle Tech Stacks
        if (projectId) {
          await supabase
            .from("project_tech_stacks")
            .delete()
            .eq("project_id", projectId);

          if (tech_stacks.length > 0) {
            const connections = tech_stacks.map((tsId) => ({
              project_id: projectId,
              tech_stack_id: tsId,
            }));
            const { error: tsError } = await supabase
              .from("project_tech_stacks")
              .insert(connections);
            if (tsError) throw tsError;
          }
        }

        toast.success(`Project ${initialData ? "updated" : "created"} successfully`);
        router.push("/admin/projects");
        router.refresh();
      } catch (error: any) {
        toast.error(error.message || "Something went wrong");
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g. Sway Booth" 
                    disabled={isPending} 
                    {...field} 
                    onChange={(e) => {
                      field.onChange(e);
                      if (!initialData?.id) {
                        form.setValue("slug", e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""));
                      }
                    }}
                  />
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
                  <Input placeholder="e.g. sway-booth" disabled={isPending} {...field} />
                </FormControl>
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
                <Textarea 
                  placeholder="Short description..." 
                  className="resize-none"
                  disabled={isPending} 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                {field.value?.length || 0}/150 characters. Keep it scannable.
              </FormDescription>
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
                <FormLabel>Live Demo URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://..." disabled={isPending} {...field} />
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
                <FormLabel>GitHub Repository URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://github.com/..." disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <Label>Project Thumbnail</Label>
          <div className="flex items-center gap-4">
            <div 
              className="w-32 h-32 rounded-xl bg-zinc-100 dark:bg-zinc-800 border flex items-center justify-center bg-cover bg-center overflow-hidden"
              style={{ backgroundImage: form.watch("thumbnail_url") ? `url(${form.watch("thumbnail_url")})` : 'none' }}
            >
              {!form.watch("thumbnail_url") && <span className="text-muted-foreground text-xs">No image</span>}
            </div>
            <div className="flex-1">
              <Input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload} 
                disabled={uploadingImage || isPending}
                className="max-w-xs"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Upload to Supabase Storage bucket.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="ambient_color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ambient Glow Color</FormLabel>
                <div className="flex flex-wrap gap-2 pt-2">
                  {AMBIENT_COLORS.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      disabled={isPending}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        field.value === color.value 
                          ? "border-primary scale-110 shadow-sm" 
                          : "border-transparent hover:scale-105"
                      }`}
                      style={{ backgroundColor: color.value }}
                      onClick={() => field.onChange(color.value)}
                      title={color.label}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-6">
            <FormField
              control={form.control}
              name="display_order"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Order</FormLabel>
                  <FormControl>
                    <Input type="number" disabled={isPending} {...field} />
                  </FormControl>
                  <FormDescription>Lower numbers appear first.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="is_featured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Featured Project</FormLabel>
                    <FormDescription>
                      Highlight this project in the showcase.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isPending}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <Label>Tech Stacks</Label>
          {techStacks.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">No tech stacks found. Please add them first.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {techStacks.map((ts) => {
                const isSelected = form.watch("tech_stacks").includes(ts.id);
                return (
                  <button
                    key={ts.id}
                    type="button"
                    disabled={isPending}
                    onClick={() => {
                      const current = form.getValues("tech_stacks");
                      if (isSelected) {
                        form.setValue("tech_stacks", current.filter(id => id !== ts.id));
                      } else {
                        form.setValue("tech_stacks", [...current, ts.id]);
                      }
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                      isSelected 
                        ? "bg-primary text-primary-foreground border-primary" 
                        : "bg-background text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800 border-border"
                    }`}
                  >
                    {ts.name}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <Button type="submit" disabled={isPending || uploadingImage} className="w-full sm:w-auto">
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {initialData ? "Save Changes" : "Create Project"}
        </Button>
      </form>
    </Form>
  );
}
