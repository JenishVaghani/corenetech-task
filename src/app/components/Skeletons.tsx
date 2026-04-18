export const TaskCardSkeleton = () => {
  return (
    <div className="rounded-2xl border border-gray-400 bg-gray-50 p-5 shadow-card">
      <div className="space-y-2">
        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
      </div>
      <div className="mt-5 flex items-center justify-between">
        <div className="h-5 w-20 animate-pulse rounded-md bg-gray-200" />
        <div className="h-3 w-12 animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  );
};

export const TaskDetailSkeleton = () => {
  return (
    <div className="rounded-2xl border border-gray-400 bg-gray-50 p-8 shadow-card">
      <div className="h-6 w-24 animate-pulse rounded bg-gray-200" />
      <div className="mt-6 space-y-3">
        <div className="h-7 w-3/4 animate-pulse rounded bg-gray-200" />
        <div className="h-7 w-1/2 animate-pulse rounded bg-gray-200" />
      </div>
      <div className="mt-8 h-10 w-40 animate-pulse rounded-lg bg-gray-200" />
    </div>
  );
};
