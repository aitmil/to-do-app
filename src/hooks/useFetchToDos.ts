import { toDoService } from "@/services/todo.service";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { IToDo } from "@/interfaces/todo.interface";

const useFetchToDos = (): UseQueryResult<IToDo[], unknown> => {
  return useQuery<IToDo[], unknown>({
    queryKey: ["todos"],
    queryFn: () => toDoService.fetchToDos(),
  });
};

export default useFetchToDos;
