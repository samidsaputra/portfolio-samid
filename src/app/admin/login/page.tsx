import { LoginForm } from "./login-form";

export const metadata = {
  title: "Admin Login — M Dimas Saputra",
};

export default function LoginPage() {
  return (
    <div className="admin-theme min-h-screen flex items-center justify-center bg-background p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Admin Login
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Enter your credentials to access the dashboard.
          </p>
        </div>
        
        <LoginForm />
      </div>
    </div>
  );
}
