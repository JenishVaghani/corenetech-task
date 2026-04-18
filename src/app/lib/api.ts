import axios from "axios";

export const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: { "Content-Type": "application/json" },
});

export const fetchTasks = async (): Promise<Task[]> => {
  const { data } = await api.get<Task[]>("/todos", { params: { _limit: 20 } });
  return data;
};

export const fetchTask = async (id: number): Promise<Task> => {
  const { data } = await api.get<Task>(`/todos/${id}`);
  return data;
};
