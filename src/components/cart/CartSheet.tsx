"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/stores/cart";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { money } from "@/data/menu";

export default function CartSheet({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void; }) {
  const { items, setQty, remove, clear, subtotalCents } = useCart();

  const subtotal = subtotalCents();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[420px] sm:w-[480px] flex flex-col">
        <SheetHeader>
          <SheetTitle>Seu Carrinho</SheetTitle>
        </SheetHeader>

        <div className="flex-1 mt-4 space-y-3 p-4 overflow-y-auto">
          {items.length === 0 ? (
            <p className="text-sm text-muted-foreground p-4">Seu carrinho está vazio.</p>
          ) : (
            items.map((it) => (
              <div key={it.id} className="flex gap-3 items-center border rounded-lg p-2">
                <div className="relative h-12 w-12 overflow-hidden rounded-md bg-muted">
                  {it.imageUrl && <Image src={it.imageUrl} alt={it.name} fill className="object-cover" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-medium truncate">{it.name}</p>
                    <button className="text-muted-foreground hover:text-destructive" onClick={() => remove(it.id)} aria-label="Remover">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground">{it.unit}</p>

                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center rounded-lg border">
                      <button className="h-8 w-8 grid place-items-center" onClick={() => setQty(it.id, Math.max(0, it.qty - 1))}>
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center text-sm tabular-nums">{it.qty}</span>
                      <button className="h-8 w-8 grid place-items-center" onClick={() => setQty(it.id, it.qty + 1)}>
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <span className="font-semibold">{money(it.priceCents * it.qty)}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t p-4">
          <div className="w-full space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="text-lg font-semibold">{money(subtotal)}</span>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={clear} disabled={items.length === 0}>
                Limpar
              </Button>
              <Button
                className="flex-1 bg-primary text-primary-foreground hover:opacity-90"
                disabled={items.length === 0}
                onClick={() => {
                  // Exemplo de "checkout" por WhatsApp
                  const msg = encodeURIComponent(
                    items
                      .map((i) => `• ${i.qty}x ${i.name} (${i.unit}) — ${money(i.priceCents * i.qty)}`)
                      .join("\n") + `\n\nSubtotal: ${money(subtotal)}`
                  );
                  console.log(msg, "mensagem");
                  window.open(`https://wa.me/5581987428086?text=${msg}`, "_blank");
                }}
              >
                Finalizar pelo WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}