import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useAppDispatch } from "../redux/store";
import { addLocalTask } from "../redux/slices/tasksSlice";

const TaskForm = ({ open, onClose }: TaskFormProps) => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setTitle("");
      setCompleted(false);
      setError(null);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (trimmed.length < 3) {
      setError("Title must be at least 3 characters.");
      return;
    }
    dispatch(addLocalTask({ title: trimmed, completed }));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-foreground/30 backdrop-blur-sm animate-in fade-in"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md rounded-2xl border border-gray-200 bg-gray-100 p-6 animate-in fade-in zoom-in-95">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-text-main">
              New Task
            </h2>
            <p className="mt-1 text-sm text-text-secondary">
              Add a task to your list.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-md text-gray-700 bg-gray-300 hover:bg-gray-300/55 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <input
              id="title"
              autoFocus
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError(null);
              }}
              placeholder="e.g. Review pull requests"
              className={`h-10 w-full rounded-lg border bg-white px-3 text-sm text-text-main placeholder:text-gray-500 focus:outline-none ${
                error ? "border-red-500" : "border-gray-500 "
              }`}
            />
            {error && <p className="text-xs text-red-500">{error}</p>}
          </div>

          <label className="flex items-center gap-2.5 rounded-lg border border-gray-500 bg-white px-3 py-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
              className="h-4 w-4 rounded border-gray-500"
            />
            <span className="text-sm">Mark as completed</span>
          </label>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="h-9 rounded-lg bg-gray-300 px-4 text-sm font-medium text-text-main hover:bg-gray-400 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-9 rounded-lg bg-primary px-4 text-sm font-medium text-text-on-primary transition-colors hover:bg-blue-700 cursor-pointer"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
