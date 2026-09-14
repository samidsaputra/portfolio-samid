import { TechStackForm } from "../../tech-stack-form";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Tech Stack — Admin Panel",
};

export default async function EditTechStackPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const { id } = await params;
  
  const { data: techStack, error } = await supabase
    .from("tech_stacks")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !techStack) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Edit Tech Stack</h1>
        <p className="text-muted-foreground mt-2">Update technology details.</p>
      </div>

      <div className="bg-secondary/50 border border-white/5 rounded-xl p-6 shadow-sm backdrop-blur-sm">
        <TechStackForm initialData={techStack} />
      </div>
    </div>
  );
}
