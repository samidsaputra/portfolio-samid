import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus, Pencil, Trash2 } from "lucide-react";

export const metadata = {
  title: "Manage Tech Stacks — Admin Panel",
};

export default async function TechStacksPage() {
  const supabase = await createClient();

  const { data: techStacks } = await supabase
    .from("tech_stacks")
    .select("*")
    .order("name", { ascending: true });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold tracking-tight">Tech Stacks</h1>
        <Link href="/admin/tech-stacks/new" className={cn(buttonVariants())}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Tech Stack
        </Link>
      </div>

      <div className="bg-secondary/50 border border-white/5 rounded-xl overflow-hidden shadow-sm backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-text-primary">
            <thead className="text-xs text-muted-foreground uppercase bg-zinc-50 dark:bg-zinc-800/50 border-b">
              <tr>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {techStacks && techStacks.length > 0 ? (
                techStacks.map((ts) => (
                  <tr key={ts.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">{ts.name}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/tech-stacks/${ts.id}/edit`} className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}>
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Link>
                        <form action={async () => {
                          "use server"
                          const supabase = await createClient();
                          await supabase.from("tech_stacks").delete().eq("id", ts.id);
                          const { revalidatePath } = await import("next/cache");
                          revalidatePath("/admin/tech-stacks");
                          revalidatePath("/admin/projects/new");
                          revalidatePath("/", "layout");
                        }}>
                          <Button variant="ghost" size="icon" type="submit" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50">
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="px-6 py-8 text-center text-muted-foreground">
                    No tech stacks found. Create one to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
