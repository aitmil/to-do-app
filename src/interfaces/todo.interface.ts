export interface IToDo {
  userId: string;
  id: string;
  title: string;
  completed: boolean;
}

export interface Context {
  previousTodos: IToDo[];
  optimisticTodo: IToDo;
}

export interface AddTodoParams {
  id: string;
  title: string;
}

export interface IToDoService {
  fetchToDos(): Promise<IToDo[]>;
  createToDo(todo: IToDo): Promise<IToDo>;
  deleteToDo(id: string): Promise<void>;
}
