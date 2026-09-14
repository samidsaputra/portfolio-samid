import { ProjectForm } from "../../project-form";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Project — Admin Panel",
};

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const { id } = await params;
  
  const [projectRes, techStacksRes, projectTechStacksRes] = await Promise.all([
    supabase.from("projects").select("*").eq("id", id).single(),
    supabase.from("tech_stacks").select("id, name").order("name"),
    supabase.from("project_tech_stacks").select("tech_stack_id").eq("project_id", id)
  ]);

  if (projectRes.error || !projectRes.data) {
    notFound();
  }

  const currentTechStacks = projectTechStacksRes.data?.map(pt => pt.tech_stack_id) || [];

  const initialData = {
    ...projectRes.data,
    tech_stacks: currentTechStacks
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Edit Project</h1>
        <p className="text-muted-foreground mt-2">Update your project details.</p>
      </div>

      <div className="bg-secondary/50 border border-white/5 rounded-xl p-6 shadow-sm backdrop-blur-sm">
        <ProjectForm 
          initialData={initialData} 
          techStacks={techStacksRes.data || []} 
        />
      </div>
    </div>
  );
}
