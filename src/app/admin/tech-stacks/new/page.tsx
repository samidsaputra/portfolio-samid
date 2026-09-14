import { TechStackForm } from "../tech-stack-form";

export const metadata = {
  title: "New Tech Stack — Admin Panel",
};

export default function NewTechStackPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">New Tech Stack</h1>
        <p className="text-muted-foreground mt-2">Add a new technology to your stack.</p>
      </div>

      <div className="bg-white dark:bg-zinc-900 border rounded-xl p-6 shadow-sm">
        <TechStackForm />
      </div>
    </div>
  );
}
