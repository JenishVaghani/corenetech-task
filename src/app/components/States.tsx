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
        <AlertCircle className="h-6 w-6 text-text-main" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-text-main">
        Something went wrong
      </h3>
      <p className="mt-1 max-w-sm text-sm text-text-main">
        {message ?? "We couldn't load your tasks. Please try again."}
      </p>
      <button
        onClick={onRetry}
        className="mt-5 h-9 rounded-lg bg-primary px-4 text-sm font-medium text-text-on-primary transition-colors"
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
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-muted-foreground text-text-on-primary">
        <Inbox className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-text-main">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-text-main">{description}</p>
    </div>
  );
}
