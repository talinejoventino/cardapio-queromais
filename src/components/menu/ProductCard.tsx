"use client";

import Image from "next/image";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";

type Props = {
  title: string;
  subtitle?: string;      
  description?: string;
  price: string;
  oldPrice?: string;
  imageUrl?: string;
  minOrder?: number;
  onAdd?: (qty: number) => void;
};

export default function ProductCard({
  title, subtitle, description, price, oldPrice, imageUrl, minOrder = 1, onAdd,
}: Props) {
  const [qty, setQty] = useState(minOrder);
  const dec = () => setQty((q) => Math.max(minOrder, q - 1));
  const inc = () => setQty((q) => q + 1);

  return (
    <Card className={["flex flex-row items-stretch gap-4 p-4 rounded-xl shadow-sm hover:shadow-md transition bg-card",
      ].join(" ")}
    >
      {/* thumb */}
      <div className="relative h-24 w-24 sm:h-28 sm:w-28 shrink-0 overflow-hidden rounded-lg">
        {imageUrl ? (
          <Image src={imageUrl} alt={title} fill className="object-cover" />
        ) : <div className="h-full w-full grid place-content-center text-xs text-muted-foreground">sem imagem</div>}
      </div>

      {/* conteúdo */}
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-semibold leading-tight truncate">{title}</h3>
            {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
            {description && (
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{description}</p>
            )}
          </div>
          <div className="text-right shrink-0">
            <div className="font-semibold text-[hsl(7,80%,40%)]">{price}</div>
            {oldPrice && <div className="text-xs text-muted-foreground line-through">{oldPrice}</div>}
          </div>
        </div>

        {/* ações */}
        <div className="mt-3 flex items-center justify-end gap-2">
          <div className="flex items-center rounded-lg border border-border">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={dec} aria-label="Diminuir"><Minus className="h-4 w-4" /></Button>
            <span className="w-8 text-center text-sm tabular-nums">{qty}</span>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={inc} aria-label="Aumentar"><Plus className="h-4 w-4" /></Button>
          </div>
          <Button className="h-9 px-3 bg-primary text-primary-foreground hover:opacity-90" onClick={() => onAdd?.(qty)}>
            Adicionar
          </Button>
        </div>
      </div>
    </Card>
  );
}
