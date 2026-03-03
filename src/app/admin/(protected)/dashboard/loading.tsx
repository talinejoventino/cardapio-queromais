export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-8 w-32 bg-muted rounded" />
        <div className="h-9 w-36 bg-muted rounded" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="bg-white rounded-lg border p-4">
            <div className="h-4 w-28 bg-muted rounded" />
            <div className="h-8 w-12 bg-muted rounded mt-2" />
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg border">
        <div className="p-4 border-b">
          <div className="h-9 w-52 bg-muted rounded" />
        </div>
        <div className="divide-y">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-4 p-4">
              <div className="h-10 w-10 bg-muted rounded-md shrink-0" />
              <div className="flex-1 space-y-1.5">
                <div className="h-4 w-40 bg-muted rounded" />
              </div>
              <div className="h-5 w-20 bg-muted rounded-full" />
              <div className="h-4 w-16 bg-muted rounded" />
              <div className="h-4 w-8 bg-muted rounded" />
              <div className="h-6 w-10 bg-muted rounded-full" />
              <div className="h-8 w-16 bg-muted rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
