"use client";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, User, Check, RotateCcw } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/redux/store";
import { fetchTask } from "@/app/lib/api";
import Header from "@/app/components/Header";
import { TaskDetailSkeleton } from "@/app/components/Skeletons";
import { ErrorState } from "@/app/components/States";
import StatusBadge from "@/app/components/StatusBadge";
import { toggleTask } from "@/app/redux/slices/tasksSlice";
import { useParams } from "next/navigation";
import Link from "next/link";

const TaskDetailPage = () => {
  const { id } = useParams();
  const numericId = Number(id);
  const dispatch = useAppDispatch();

  const { localTasks, toggledIds } = useAppSelector((s) => s.tasks);
  const localTask = localTasks.find((t) => t.id === numericId);

  const query = useQuery({
    queryKey: ["task", numericId],
    queryFn: () => fetchTask(numericId),
    enabled: !localTask && !Number.isNaN(numericId),
    retry: 1,
  });

  const remote = query.data;
  const baseTask = localTask ?? remote;
  const completed = baseTask
    ? localTask
      ? localTask.completed
      : remote!.completed !== !!toggledIds[numericId]
    : false;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showSearch={false} />
      <main className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
        <Link
          href="/tasks"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-text-main hover:text-text-main/70"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tasks
        </Link>

        <div className="mt-6 bg-white">
          {!localTask && query.isPending ? (
            <TaskDetailSkeleton />
          ) : !localTask && query.isError ? (
            <ErrorState
              onRetry={() => query.refetch()}
              message="We couldn't load this task."
            />
          ) : baseTask ? (
            <article className="rounded-2xl border border-gray-400 bg-card p-6 sm:p-8">
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-text-secondary">
                Task #{baseTask.id}
              </div>
              <h1 className="mt-2 text-2xl font-semibold leading-tight tracking-tight text-text-main sm:text-3xl">
                {baseTask.title}
              </h1>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <StatusBadge completed={completed} />
                <div className="flex items-center gap-1.5 text-sm text-text-secondary">
                  <User className="h-3.5 w-3.5" />
                  Assigned to User {baseTask.userId}
                </div>
              </div>

              <div className="mt-8 border-t border-gray-300 pt-6">
                <button
                  onClick={() => dispatch(toggleTask(numericId))}
                  className={`inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium transition-all active:scale-[0.98] cursor-pointer ${
                    !completed
                      ? "border border-gray-200 bg-green-400 text-green-700"
                      : "border border-gray-200 bg-yellow-400 text-yellow-800 hover:bg-primary-hover"
                  }`}
                >
                  {completed ? (
                    <>
                      <RotateCcw className="h-4 w-4" />
                      Mark as pending
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4" />
                      Mark as completed
                    </>
                  )}
                </button>
              </div>
            </article>
          ) : null}
        </div>
      </main>
    </div>
  );
};

export default TaskDetailPage;
