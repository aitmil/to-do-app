import { useForm } from "react-hook-form";
import { todoValidation } from "@/utils/validation";
import { useAddTodoMutation } from "@/hooks";

interface FormData {
  newTodo: string;
}

interface AddToDoFormProps {
  handleAddTodo: (newTodo: string) => void;
  inputTarget: string;
  setInputTarget: React.Dispatch<React.SetStateAction<string>>;
  addTodoMutation: ReturnType<typeof useAddTodoMutation>;
}

const AddToDoForm = ({
  handleAddTodo,
  inputTarget,
  setInputTarget,
  addTodoMutation,
}: AddToDoFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    handleAddTodo(data.newTodo);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col md:flex-row items-center md:items-start justify-center gap-4"
    >
      <div className="w-full max-w-[400px]">
        <input
          {...register("newTodo", todoValidation)}
          type="text"
          placeholder="Enter a new task"
          value={inputTarget}
          onChange={(e) => setInputTarget(e.target.value)}
          className="p-3 rounded-lg border border-[#888] w-full focus:outline-none focus:ring-2 focus:ring-[#444] focus:border-[#444] text-2xl text-[#1a1a1a]"
        />
        {errors.newTodo && (
          <p className="text-red-500 text-sm mt-1">{errors.newTodo.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={addTodoMutation.isPending}
        className="px-8 py-3 bg-[#333] text-white rounded-lg transition-all hover:bg-[#555] focus:ring-1 focus:ring-[#444] disabled:opacity-50 text-2xl"
      >
        Create
      </button>
    </form>
  );
};

export default AddToDoForm;
