export function JobCardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
      <div className="flex items-start gap-4">
        <div className="skeleton w-14 h-14 rounded-xl" />
        <div className="flex-1 space-y-2.5">
          <div className="skeleton h-3 w-24" />
          <div className="skeleton h-5 w-40" />
          <div className="skeleton h-3 w-32" />
        </div>
        <div className="skeleton w-8 h-8 rounded-lg" />
      </div>
      <div className="mt-5 flex gap-2">
        <div className="skeleton h-7 w-16 rounded-full" />
        <div className="skeleton h-7 w-20 rounded-full" />
        <div className="skeleton h-7 w-14 rounded-full" />
      </div>
      <div className="mt-5 flex items-center justify-between">
        <div className="skeleton h-4 w-28" />
        <div className="skeleton h-9 w-20 rounded-lg" />
      </div>
    </div>
  );
}

export function JobListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <JobCardSkeleton key={i} />
      ))}
    </div>
  );
}
