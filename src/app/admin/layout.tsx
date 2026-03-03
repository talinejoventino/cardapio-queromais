import type { ReactNode } from "react";

// Layout vazio: a página de login usa este shell diretamente.
// As páginas protegidas ficam em (protected)/layout.tsx.
export default function AdminLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
