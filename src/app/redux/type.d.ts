interface TasksState {
  localTasks: Task[];
  toggledIds: Record<number, boolean>;
  nextId: number;
}
