import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ProductCard({
  title, description, price, imageUrl, unavailable, unit, minOrder, tags,
}: {
  title: string;
  description?: string;
  price: string;
  imageUrl?: string;
  unavailable?: boolean;
  unit?: string;
  minOrder?: number;
  tags?: string[];
}) {
  return (
    <Card className="overflow-hidden h-full">
      {imageUrl ? (
        <div className="relative h-40 w-full">
          <Image src={imageUrl} alt={title} fill className="object-cover" />
        </div>
      ) : null}
      <CardContent className="p-4 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold leading-tight">{title}</h3>
          <span className="font-bold shrink-0">{price}</span>
        </div>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}

        <div className="flex flex-wrap gap-2">
          {unit ? <Badge variant="secondary">{unit}</Badge> : null}
          {typeof minOrder === "number" ? (
            <Badge variant="outline">mín. {minOrder}</Badge>
          ) : null}
          {tags?.map((t) => (
            <Badge key={t} variant="outline">{t}</Badge>
          ))}
          {unavailable ? <Badge variant="secondary">Indisponível</Badge> : null}
        </div>
      </CardContent>
    </Card>
  );
}
