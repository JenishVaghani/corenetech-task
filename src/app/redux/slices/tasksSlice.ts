import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: TasksState = {
  localTasks: [],
  toggledIds: {},
  nextId: 100000,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addLocalTask: {
      reducer(state, action: PayloadAction<Task>) {
        state.localTasks.unshift(action.payload);
        state.nextId += 1;
      },
      prepare(payload: { title: string; completed: boolean }) {
        return {
          payload: {
            id: Date.now(),
            title: payload.title,
            completed: payload.completed,
            userId: 1,
          } as Task,
        };
      },
    },
    toggleTask(state, action: PayloadAction<number>) {
      const id = action.payload;
      const local = state.localTasks.find((t) => t.id === id);
      if (local) {
        local.completed = !local.completed;
        return;
      }
      state.toggledIds[id] = !state.toggledIds[id];
    },
  },
});

export const { addLocalTask, toggleTask } = tasksSlice.actions;
export default tasksSlice.reducer;
