"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
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
import { Loader2, Pencil, Trash2 } from "lucide-react";
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
  const [editingId, setEditingId] = useState<string | null>(null);

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
        <div className="p-3 sm:p-4 border-b flex items-center gap-3">
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full sm:w-52">
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
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            {filtered.length} produto{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>Nome</TableHead>
                <TableHead className="hidden sm:table-cell">Categoria</TableHead>
                <TableHead className="hidden sm:table-cell">Preço</TableHead>
                <TableHead className="hidden md:table-cell">Unidade</TableHead>
                <TableHead className="text-center">Ativo</TableHead>
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
                          sizes="40px"
                          className="object-cover"
                          unoptimized={p.image_url.startsWith("/")}
                        />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{p.name}</div>
                    <div className="text-xs text-muted-foreground sm:hidden mt-0.5">
                      {money(p.price_cents)}
                      {p.unit && <span className="ml-1">· {p.unit}</span>}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant="secondary">
                      {p.categories?.name ?? p.category_slug}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{money(p.price_cents)}</TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
                    {p.unit ?? "—"}
                  </TableCell>
                  <TableCell className="text-center">
                    <Switch
                      checked={p.is_available}
                      onCheckedChange={() => toggleAvailability(p.id, p.is_available)}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-1 sm:gap-2 justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        disabled={editingId === p.id}
                        onClick={() => {
                          setEditingId(p.id);
                          router.push(`/admin/produtos/${p.id}/editar`);
                        }}
                      >
                        {editingId === p.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Pencil className="h-4 w-4" />
                        )}
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
