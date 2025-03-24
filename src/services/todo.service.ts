import axios, { AxiosResponse } from "axios";
import { IToDo, IToDoService } from "@/interfaces/todo.interface";

const API_BASE_URL = process.env.NEXT_PUBLIC_PROJECT_TOKEN;
if (!API_BASE_URL) throw new Error("API_BASE_URL is not defined");

class ToDoService implements IToDoService {
  private buildUrl(path: string): string {
    return `${API_BASE_URL}/${path}`;
  }

  async fetchToDos(): Promise<IToDo[]> {
    const response: AxiosResponse<IToDo[]> = await axios.get(
      this.buildUrl("todos?_limit=10")
    );
    return response.data;
  }

  async createToDo(todo: IToDo): Promise<IToDo> {
    const response: AxiosResponse<IToDo> = await axios.post(
      this.buildUrl("todos"),
      todo
    );
    return response.data;
  }

  async deleteToDo(id: string): Promise<void> {
    await axios.delete(this.buildUrl(`todos/${id}`));
  }
}

export const toDoService = new ToDoService();
