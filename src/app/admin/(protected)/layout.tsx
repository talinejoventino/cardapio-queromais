import type { ReactNode } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-white border-b px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="font-bold text-lg">Quero Mais · Admin</span>
          <nav className="flex gap-4 text-sm">
            <Link href="/admin/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
              Produtos
            </Link>
            <Link href="/admin/categorias" className="text-muted-foreground hover:text-foreground transition-colors">
              Categorias
            </Link>
          </nav>
        </div>
        <AdminLogoutButton />
      </header>
      <main className="p-6 max-w-6xl mx-auto">{children}</main>
    </div>
  );
}
