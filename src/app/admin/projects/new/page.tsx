import { ProjectForm } from "../project-form";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "New Project — Admin Panel",
};

export default async function NewProjectPage() {
  const supabase = await createClient();
  const { data: techStacks } = await supabase.from("tech_stacks").select("id, name").order("name");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">New Project</h1>
        <p className="text-muted-foreground mt-2">Add a new project to your showcase.</p>
      </div>

      <div className="bg-secondary/50 border border-white/5 rounded-xl p-6 shadow-sm backdrop-blur-sm">
        <ProjectForm techStacks={techStacks || []} />
      </div>
    </div>
  );
}
