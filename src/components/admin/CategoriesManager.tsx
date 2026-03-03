"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Pencil, Trash2, Plus, Check, X } from "lucide-react";
import { toast } from "sonner";

type Category = { id: string; name: string; slug: string; order: number };

export default function CategoriesManager({
  categories: initialCategories,
  productCountBySlug,
}: {
  categories: Category[];
  productCountBySlug: Record<string, number>;
}) {
  const router = useRouter();
  const [categories, setCategories] = useState(initialCategories);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editSlug, setEditSlug] = useState("");
  const [editOrder, setEditOrder] = useState(0);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  // New category
  const [showNew, setShowNew] = useState(false);
  const [newName, setNewName] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [newOrder, setNewOrder] = useState(0);
  const [saving, setSaving] = useState(false);

  function startEdit(cat: Category) {
    setEditingId(cat.id);
    setEditName(cat.name);
    setEditSlug(cat.slug);
    setEditOrder(cat.order);
  }

  async function saveEdit(id: string) {
    setSaving(true);
    const res = await fetch(`/api/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editName, slug: editSlug, order: editOrder }),
    });

    if (!res.ok) {
      const json = await res.json();
      toast.error("Erro: " + json.error);
      setSaving(false);
      return;
    }

    setCategories((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, name: editName, slug: editSlug, order: editOrder } : c
      )
    );
    setEditingId(null);
    setSaving(false);
    toast.success("Categoria atualizada");
    router.refresh();
  }

  async function addCategory() {
    if (!newName.trim() || !newSlug.trim()) {
      toast.error("Preencha nome e slug");
      return;
    }
    setSaving(true);
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName, slug: newSlug, order: newOrder }),
    });

    if (!res.ok) {
      const json = await res.json();
      toast.error("Erro: " + json.error);
      setSaving(false);
      return;
    }

    const data = await res.json();
    setCategories((prev) => [...prev, data].sort((a, b) => a.order - b.order));
    setShowNew(false);
    setNewName("");
    setNewSlug("");
    setNewOrder(0);
    setSaving(false);
    toast.success("Categoria criada");
    router.refresh();
  }

  async function confirmDelete() {
    if (!deleteId) return;
    setDeleting(true);
    const res = await fetch(`/api/categories/${deleteId}`, { method: "DELETE" });

    if (!res.ok) {
      toast.error("Erro ao deletar categoria");
      setDeleting(false);
      return;
    }

    setCategories((prev) => prev.filter((c) => c.id !== deleteId));
    setDeleteId(null);
    setDeleting(false);
    toast.success("Categoria removida");
    router.refresh();
  }

  const deleteTarget = categories.find((c) => c.id === deleteId);
  const deleteCount = deleteTarget ? (productCountBySlug[deleteTarget.slug] ?? 0) : 0;

  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-end">
          <Button size="sm" onClick={() => setShowNew(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nova categoria
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead className="text-center">Ordem</TableHead>
              <TableHead className="text-center">Produtos</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((cat) =>
              editingId === cat.id ? (
                <TableRow key={cat.id}>
                  <TableCell>
                    <Input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="h-8"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={editSlug}
                      onChange={(e) => setEditSlug(e.target.value)}
                      className="h-8 font-mono text-sm"
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <Input
                      type="number"
                      value={editOrder}
                      onChange={(e) => setEditOrder(Number(e.target.value))}
                      className="h-8 w-16 mx-auto text-center"
                    />
                  </TableCell>
                  <TableCell className="text-center text-muted-foreground text-sm">
                    {productCountBySlug[cat.slug] ?? 0}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => saveEdit(cat.id)}
                        disabled={saving}
                      >
                        <Check className="h-4 w-4 text-green-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setEditingId(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow key={cat.id}>
                  <TableCell className="font-medium">{cat.name}</TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">
                    {cat.slug}
                  </TableCell>
                  <TableCell className="text-center">{cat.order}</TableCell>
                  <TableCell className="text-center text-muted-foreground text-sm">
                    {productCountBySlug[cat.slug] ?? 0}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => startEdit(cat)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => setDeleteId(cat.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>

      {/* Modal nova categoria */}
      <Dialog open={showNew} onOpenChange={setShowNew}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nova categoria</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label>Nome</Label>
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Ex.: Bolinhos de 12 und"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Slug (URL)</Label>
              <Input
                value={newSlug}
                onChange={(e) => setNewSlug(e.target.value)}
                placeholder="Ex.: bolinho-12"
                className="font-mono"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Ordem</Label>
              <Input
                type="number"
                value={newOrder}
                onChange={(e) => setNewOrder(Number(e.target.value))}
                className="w-24"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNew(false)} disabled={saving}>
              Cancelar
            </Button>
            <Button onClick={addCategory} disabled={saving}>
              {saving ? "Salvando..." : "Criar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal confirmar delete */}
      <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remover categoria</DialogTitle>
            <DialogDescription>
              {deleteCount > 0 ? (
                <>
                  Esta categoria tem <strong>{deleteCount} produto{deleteCount !== 1 ? "s" : ""}</strong> associado{deleteCount !== 1 ? "s" : ""}.
                  Os produtos ficarão sem categoria após a remoção.
                </>
              ) : (
                "Tem certeza que deseja remover esta categoria?"
              )}
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
