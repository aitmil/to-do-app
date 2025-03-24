import { useDeleteTodoMutation } from "@/hooks";
import { IToDo } from "@/interfaces/todo.interface";

interface ToDoListProps {
  todos: IToDo[];
  deleteTodoMutation: ReturnType<typeof useDeleteTodoMutation>;
}

const ToDoList = ({ todos, deleteTodoMutation }: ToDoListProps) => {
  return (
    <>
      {todos.length === 0 ? (
        <p className="text-xl text-center mt-8">No todos found</p>
      ) : (
        <ul className="mt-8 space-y-5">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-between p-4 bg-[#ffffff] shadow-md rounded-lg border border-[#ddd] text-[#1a1a1a] text-2xl"
            >
              <p className="text-center">{todo.title}</p>
              <button
                type="button"
                onClick={() => deleteTodoMutation.mutate(todo.id)}
                className="px-6 py-3 bg-[#d32f2f] text-white rounded-lg transition-all hover:bg-[#c62828] focus:ring-1 focus:ring-[#b71c1c] text-xl"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ToDoList;
