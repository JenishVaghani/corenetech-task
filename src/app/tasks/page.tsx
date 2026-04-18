"use client";
import React, { useMemo, useState } from "react";
import Header from "../components/Header";
import FilterBar from "../components/FilterBar";
import { Plus } from "lucide-react";
import { TaskCardSkeleton } from "../components/Skeletons";
import { EmptyState, ErrorState } from "../components/States";
import { TaskCard } from "../components/TaskCard";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "../hooks/useDebounce";
import { fetchTasks } from "../lib/api";
import { useAppSelector } from "../redux/store";

const TaskPage = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [formOpen, setFormOpen] = useState(false);

  const debouncedSearch = useDebounce(search, 300);
  const { localTasks, toggledIds } = useAppSelector((s) => s.tasks);

  const query = useQuery({ queryKey: ["tasks"], queryFn: fetchTasks });

  const allTasks: Task[] = useMemo(() => {
    const remote = (query.data ?? []).map((t) =>
      toggledIds[t.id] !== undefined
        ? { ...t, completed: t.completed !== toggledIds[t.id] }
        : t,
    );
    return [...localTasks, ...remote];
  }, [query.data, localTasks, toggledIds]);

  const counts = useMemo(
    () => ({
      all: allTasks.length,
      completed: allTasks.filter((t) => t.completed).length,
      pending: allTasks.filter((t) => !t.completed).length,
    }),
    [allTasks],
  );

  const filtered = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase();
    return allTasks.filter((t) => {
      if (filter === "completed" && !t.completed) return false;
      if (filter === "pending" && t.completed) return false;
      if (q && !t.title.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [allTasks, filter, debouncedSearch]);
  return (
    <div>
      <Header search={search} onSearchChange={setSearch} />

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        <div className="flex flex-col gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Tasks
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Organize your work and track progress at a glance.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <FilterBar filter={filter} onChange={setFilter} counts={counts} />
            <button
              onClick={() => setFormOpen(true)}
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-blue-500 px-4 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-600 active:scale-[0.98] cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              Add Task
            </button>
          </div>
        </div>

        <div className="mt-6">
          {query.isPending ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <TaskCardSkeleton key={i} />
              ))}
            </div>
          ) : query.isError ? (
            <ErrorState onRetry={() => query.refetch()} />
          ) : filtered.length === 0 ? (
            <EmptyState
              title="No tasks found"
              description={
                debouncedSearch
                  ? `No tasks match "${debouncedSearch}". Try another search.`
                  : "You're all caught up. Create a new task to get started."
              }
            />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TaskPage;
