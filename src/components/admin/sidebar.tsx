"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Briefcase, 
  Award, 
  Layers, 
  Clock, 
  User,
  LogOut
} from "lucide-react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/admin/projects", icon: Briefcase },
  { name: "Certificates", href: "/admin/certificates", icon: Award },
  { name: "Tech Stacks", href: "/admin/tech-stacks", icon: Layers },
  { name: "Experiences", href: "/admin/experiences", icon: Clock },
  { name: "Profile", href: "/admin/profile", icon: User },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="flex h-full w-64 flex-col bg-surface border-r border-border-custom">
      <div className="flex h-16 shrink-0 items-center px-6 border-b border-border-custom">
        <Link href="/admin/dashboard" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-full rounded-tr-none flex items-center justify-center text-white font-bold text-sm">
            S
          </div>
          <span className="text-lg font-bold tracking-tight">Admin</span>
        </Link>
      </div>
      
      <div className="flex flex-1 flex-col overflow-y-auto px-4 py-6 gap-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                isActive
                  ? "bg-accent-monochrome text-accent-dark font-medium shadow-[0_0_15px_rgba(200,243,29,0.15)] translate-x-1"
                  : "text-text-secondary hover:bg-secondary hover:text-text-primary hover:translate-x-1"
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5 transition-transform duration-200",
                  isActive ? "scale-110" : "group-hover:scale-110"
                )}
                aria-hidden="true"
              />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-border-custom">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
        >
          <LogOut className="h-5 w-5 shrink-0" aria-hidden="true" />
          Log out
        </button>
      </div>
    </div>
  );
}
