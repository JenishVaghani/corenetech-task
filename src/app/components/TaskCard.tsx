import { User } from "lucide-react";
import Link from "next/link";
import StatusBadge from "./StatusBadge";

export function TaskCard({ task }: TaskCardProps) {
  return (
    <Link
      href={`/tasks/${task.id}`}
      className="group block rounded-2xl border border-gray-200 bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-gray-900 transition-colors hover:text-gray-900/50 sm:text-base">
          {task.title}
        </h3>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <StatusBadge completed={task.completed} />
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <User className="h-3 w-3" />
          User {task.userId}
        </div>
      </div>
    </Link>
  );
}
