type Filter = "all" | "completed" | "pending";

interface FilterBarProps {
  filter: Filter;
  onChange: (f: Filter) => void;
  counts: { all: number; completed: number; pending: number };
}

interface StatusBadgeProps {
  completed: boolean;
}

interface HeaderProps {
  search?: string;
  onSearchChange?: (v: string) => void;
  showSearch?: boolean;
}

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
}

interface TaskCardProps {
  task: Task;
}
