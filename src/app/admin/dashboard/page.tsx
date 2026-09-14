import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Admin Dashboard — M Dimas Saputra",
};

export default async function DashboardPage() {
  const supabase = await createClient();

  const [{ count: projectsCount }, { count: techStacksCount }] = await Promise.all([
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase.from("tech_stacks").select("*", { count: "exact", head: true }),
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-zinc-900 border p-6 rounded-xl shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">Total Projects</p>
          <p className="text-3xl font-bold mt-2">{projectsCount ?? 0}</p>
        </div>
        
        <div className="bg-white dark:bg-zinc-900 border p-6 rounded-xl shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">Total Tech Stacks</p>
          <p className="text-3xl font-bold mt-2">{techStacksCount ?? 0}</p>
        </div>
      </div>
    </div>
  );
}
