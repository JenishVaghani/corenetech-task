import { Search, X } from "lucide-react";

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search tasks..."
        className="h-9 w-full rounded-lg border border-gray-400 bg-white pl-9 pr-9 text-sm text-gray-600 placeholder:text-gray-500 "
      />
      {value && (
        <button
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md text-gray-600 hover:bg-gray-200 cursor-pointer"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
