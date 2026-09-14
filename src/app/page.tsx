import { Chapter1 } from "@/components/landing/chapter-1";
import { Chapter2 } from "@/components/landing/chapter-2";
import { Chapter3 } from "@/components/landing/chapter-3";
import { Chapter4 } from "@/components/landing/chapter-4";
import { ChapterNavigation } from "@/components/landing/chapter-navigation";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export default async function LandingPage() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  // Fetch data
  const { data: profile } = await supabase.from("profile").select("*").single();
  const { data: projects } = await supabase.from("projects").select(`*, project_tech_stacks (tech_stacks (id, name))`).order("display_order", { ascending: true }).order("created_at", { ascending: false });

  const projectData = projects || [];

  return (
    <main className="relative z-[5] min-h-screen text-foreground selection:bg-white/20">
      {/* Chapter Indicator Navigation */}
      <ChapterNavigation />

      {/* Cinematic Narrative Structure */}
      <Chapter1 />
      
      <Chapter2 
        aboutText={profile?.about_text || ""}
        photoUrl={profile?.photo_url || null}
      />

      <Chapter3 projects={projectData} />

      <Chapter4 
        email={profile?.email || null}
        linkedinUrl={profile?.linkedin_url || null}
        githubUrl={profile?.github_url || null}
      />
    </main>
  );
}
