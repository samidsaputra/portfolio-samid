import Link from "next/link";
import { LayoutDashboard, Briefcase, Code2, UserCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row font-sans relative z-10">
      <aside className="w-full md:w-64 bg-secondary/50 border-r border-white/5 p-6 flex flex-col md:min-h-screen shrink-0 backdrop-blur-md">
        <div className="mb-8 font-semibold tracking-widest uppercase text-sm hidden md:block text-white/50">
          Admin Console
        </div>
        
        <nav className="flex-1 space-y-1">
          <Link href="/admin/dashboard" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-text-secondary hover:text-white hover:bg-white/5 transition-colors">
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <Link href="/admin/projects" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-text-secondary hover:text-white hover:bg-white/5 transition-colors">
            <Briefcase className="h-4 w-4" />
            Projects
          </Link>
          <Link href="/admin/tech-stacks" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-text-secondary hover:text-white hover:bg-white/5 transition-colors">
            <Code2 className="h-4 w-4" />
            Tech Stacks
          </Link>
          <Link href="/admin/profile" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-text-secondary hover:text-white hover:bg-white/5 transition-colors">
            <UserCircle className="h-4 w-4" />
            Profile
          </Link>
        </nav>
        
        <div className="mt-8 pt-6 border-t border-white/5">
          <form action="/auth/signout" method="POST">
            <button type="submit" className="flex items-center gap-3 px-3 py-2 w-full text-left text-sm font-medium rounded-md hover:bg-red-950/30 hover:text-red-400 text-text-tertiary transition-colors">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/5 text-[10px] text-white">
                {user.email?.charAt(0).toUpperCase()}
              </span>
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
