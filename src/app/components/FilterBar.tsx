import { tabs } from "./constant";

const FilterBar = ({ filter, onChange, counts }: FilterBarProps) => {
  return (
    <div className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-gray-100 p-1">
      {tabs.map((t) => {
        const active = filter === t.value;
        return (
          <button
            key={t.value}
            onClick={() => onChange(t.value)}
            className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-all cursor-pointer ${
              active
                ? "bg-white text-text-main shadow-sm"
                : "text-text-secondary hover:text-text-main"
            }`}
          >
            {t.label}
            <span
              className={`rounded px-1.5 py-0.5 text-xs tabular-nums ${
                active
                  ? "bg-gray-200 text-text-main"
                  : "bg-transparent text-gray-500"
              }`}
            >
              {counts[t.value]}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default FilterBar;
