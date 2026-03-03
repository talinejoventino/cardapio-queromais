export default function EditarLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="h-5 w-5 bg-muted rounded" />
        <div className="h-8 w-40 bg-muted rounded" />
      </div>

      <div className="bg-white rounded-lg border p-6 max-w-2xl space-y-6">
        <div className="space-y-2">
          <div className="h-4 w-32 bg-muted rounded" />
          <div className="border-2 border-dashed rounded-lg h-48 bg-muted/30" />
        </div>

        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="space-y-1.5">
            <div className="h-4 w-24 bg-muted rounded" />
            <div className="h-10 w-full bg-muted rounded" />
          </div>
        ))}

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <div className="h-4 w-20 bg-muted rounded" />
            <div className="h-10 bg-muted rounded" />
          </div>
          <div className="space-y-1.5">
            <div className="h-4 w-20 bg-muted rounded" />
            <div className="h-10 bg-muted rounded" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-6 w-10 bg-muted rounded-full" />
          <div className="h-4 w-40 bg-muted rounded" />
        </div>

        <div className="flex gap-3 pt-2">
          <div className="h-9 w-36 bg-muted rounded" />
          <div className="h-9 w-24 bg-muted rounded" />
        </div>
      </div>
    </div>
  );
}
