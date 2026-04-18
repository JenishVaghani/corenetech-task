import { AlertCircle, Inbox } from "lucide-react";

export function ErrorState({
  onRetry,
  message,
}: {
  onRetry: () => void;
  message?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-gray-500 px-6 py-16 text-center shadow-card">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertCircle className="h-6 w-6 text-gray-900" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-gray-900">
        Something went wrong
      </h3>
      <p className="mt-1 max-w-sm text-sm text-gray-900">
        {message ?? "We couldn't load your tasks. Please try again."}
      </p>
      <button
        onClick={onRetry}
        className="mt-5 h-9 rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
      >
        Try again
      </button>
    </div>
  );
}

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-gray-500 px-6 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-muted-foreground text-white">
        <Inbox className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-gray-900">{description}</p>
    </div>
  );
}
