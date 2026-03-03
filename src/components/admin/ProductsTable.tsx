"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pencil, Trash2 } from "lucide-react";
import { money } from "@/lib/utils";
import { toast } from "sonner";

type Product = {
  id: string;
  name: string;
  price_cents: number;
  unit: string | null;
  is_available: boolean;
  image_url: string | null;
  category_slug: string;
  categories?: { name: string } | null;
};

type Category = { id: string; name: string; slug: string; order: number };

export default function ProductsTable({
  products: initialProducts,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const router = useRouter();
  const [products, setProducts] = useState(initialProducts);
  const [filterCategory, setFilterCategory] = useState("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const filtered =
    filterCategory === "all"
      ? products
      : products.filter((p) => p.category_slug === filterCategory);

  async function toggleAvailability(id: string, current: boolean) {
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_available: !current }),
    });

    if (!res.ok) {
      toast.error("Erro ao atualizar disponibilidade");
      return;
    }

    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, is_available: !current } : p))
    );
    toast.success(!current ? "Produto disponível" : "Produto indisponível");
  }

  async function confirmDelete() {
    if (!deleteId) return;
    setDeleting(true);

    const res = await fetch(`/api/products/${deleteId}`, { method: "DELETE" });

    if (!res.ok) {
      toast.error("Erro ao deletar produto");
      setDeleting(false);
      return;
    }

    setProducts((prev) => prev.filter((p) => p.id !== deleteId));
    setDeleteId(null);
    setDeleting(false);
    toast.success("Produto removido");
    router.refresh();
  }

  return (
    <>
      <div className="bg-white rounded-lg border">
        <div className="p-4 border-b flex items-center gap-3">
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-52">
              <SelectValue placeholder="Filtrar por categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as categorias</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c.slug} value={c.slug}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground">
            {filtered.length} produto{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Unidade</TableHead>
              <TableHead className="text-center">Disponível</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                  Nenhum produto encontrado.
                </TableCell>
              </TableRow>
            )}
            {filtered.map((p) => (
              <TableRow key={p.id}>
                <TableCell>
                  <div className="relative h-10 w-10 rounded-md overflow-hidden bg-muted">
                    {p.image_url && (
                      <Image
                        src={p.image_url}
                        alt={p.name}
                        fill
                        className="object-cover"
                        unoptimized={p.image_url.startsWith("/")}
                      />
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{p.name}</TableCell>
                <TableCell>
                  <Badge variant="secondary">
                    {p.categories?.name ?? p.category_slug}
                  </Badge>
                </TableCell>
                <TableCell>{money(p.price_cents)}</TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {p.unit ?? "—"}
                </TableCell>
                <TableCell className="text-center">
                  <Switch
                    checked={p.is_available}
                    onCheckedChange={() => toggleAvailability(p.id, p.is_available)}
                  />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/admin/produtos/${p.id}/editar`}>
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => setDeleteId(p.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remover produto</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja remover este produto? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)} disabled={deleting}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={deleting}>
              {deleting ? "Removendo..." : "Remover"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
