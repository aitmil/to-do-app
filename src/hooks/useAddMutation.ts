import {
  QueryClient,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import { AddTodoParams, Context, IToDo } from "@/interfaces/todo.interface";
import { toDoService } from "@/services/todo.service";

const useAddTodoMutation = (
  queryClient: QueryClient
): UseMutationResult<IToDo, unknown, AddTodoParams, Context> => {
  return useMutation<IToDo, unknown, AddTodoParams, Context>({
    mutationFn: async ({ id, title }) => {
      return toDoService.createToDo({
        id,
        userId: "1",
        title,
        completed: false,
      });
    },
    onMutate: async ({ id, title }) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData<IToDo[]>(["todos"]) || [];

      const newId = id || Date.now().toString();
      const optimisticTodo: IToDo = {
        id: newId,
        userId: "1",
        title,
        completed: false,
      };

      queryClient.setQueryData(["todos"], [...previousTodos, optimisticTodo]);

      return { previousTodos, optimisticTodo };
    },
    onSuccess: (newTodo, { id }, context) => {
      if (!context) return;

      queryClient.setQueryData(["todos"], (oldTodos: IToDo[] = []) =>
        oldTodos.map((todo) =>
          todo.id === (id || context.optimisticTodo.id)
            ? { ...newTodo, id: id || context.optimisticTodo.id }
            : todo
        )
      );
    },
    onError: (_error, _newTodo, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(["todos"], context.previousTodos);
      }
    },
  });
};

export default useAddTodoMutation;
