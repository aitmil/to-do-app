"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useFetchToDos,
} from "@/hooks";
import AddToDoForm from "@/ui/add-todo-form";
import ToDoList from "@/ui/todo-list";

const ToDoPage = () => {
  const queryClient = useQueryClient();
  const [inputTarget, setInputTarget] = useState<string>("");

  const { data: todos = [], isLoading } = useFetchToDos();
  const addTodoMutation = useAddTodoMutation(queryClient);
  const deleteTodoMutation = useDeleteTodoMutation(queryClient);

  const handleAddTodo = (newTodo: string) => {
    if (!newTodo.trim()) return;

    addTodoMutation.mutate({
      id: `custom-id-${Date.now()}`,
      title: newTodo,
    });
    setInputTarget("");
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="font-bold text-[#1a1a1a] text-center text-2xl md:text-3xl xl:text-5xl mb-6 md:mb-8 xl:mb-10">
        Todo App using Next.js and JSONPlaceholder API
      </h1>

      <AddToDoForm
        handleAddTodo={handleAddTodo}
        inputTarget={inputTarget}
        setInputTarget={setInputTarget}
        addTodoMutation={addTodoMutation}
      />

      {isLoading ? (
        <p className="text-center mt-10 text-xl">Loading...</p>
      ) : (
        <ToDoList todos={todos} deleteTodoMutation={deleteTodoMutation} />
      )}
    </main>
  );
};

export default ToDoPage;
