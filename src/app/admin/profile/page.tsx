import { createClient } from "@/lib/supabase/server";
import { ProfileForm } from "./profile-form";

export const metadata = {
  title: "Manage Profile — Admin Panel",
};

export default async function ProfilePage() {
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profile")
    .select("*")
    .single();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Profile Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your personal information, links, and about text shown on the landing page.</p>
      </div>

      <div className="bg-white dark:bg-zinc-900 border rounded-xl p-6 shadow-sm">
        <ProfileForm initialData={profile || undefined} />
      </div>
    </div>
  );
}
