import {
  QueryClient,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import { IToDo } from "@/interfaces/todo.interface";
import { toDoService } from "@/services/todo.service";
import { Context } from "@/interfaces/todo.interface";

const useDeleteTodoMutation = (
  queryClient: QueryClient
): UseMutationResult<void, unknown, string, Context> => {
  return useMutation<void, unknown, string, Context>({
    mutationFn: async (id: string) => {
      return toDoService.deleteToDo(id);
    },
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData<IToDo[]>(["todos"]) || [];

      queryClient.setQueryData(
        ["todos"],
        previousTodos.filter((todo) => todo.id !== id)
      );

      const optimisticTodo = previousTodos.find(
        (todo) => todo.id === id
      ) as IToDo;
      return { previousTodos, optimisticTodo };
    },
    onError: (_error, _id, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(["todos"], context.previousTodos);
      }
    },
  });
};

export default useDeleteTodoMutation;
