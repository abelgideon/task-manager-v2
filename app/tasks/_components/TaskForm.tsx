"use client";
import { createTaskAction } from "@/app/actions/tasks";
import { createTask } from "@/app/data/task/create-task";
import { buttonVariants } from "@/components/ui/button";
import { Task } from "@/db/schema";
import { cn } from "@/lib/utils";
import { ActionResponse } from "@/lib/zodSchemas";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { toast } from "sonner";

interface TaskFormProps {
  task?: Task;
  userId: string;
  isEditing?: boolean;
}

const initialState: ActionResponse = {
  success: false,
  message: "",
  errors: undefined,
};

export function TaskForm({ task, userId, isEditing = false }: TaskFormProps) {
  const router = useRouter();
  const [state, formAction, isLoading] = useActionState<
    ActionResponse,
    FormData
  >(async (prevState: ActionResponse, formData: FormData) => {
    try {
      const result = await createTaskAction(formData);

      if (result.success) {
        toast.success("Task Created Successfully");
        router.push("/dashboard");
      }
      return result;
    } catch (e) {
      return {
        success: false,
        error: "An error occurred",
      };
    }
  }, initialState);
  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label className="mb-2 block" htmlFor="title">
          Title
        </label>
        <input
          className="border block w-full p-4"
          id="title"
          type="text"
          name="title"
          placeholder="Enter title here"
          required
        />
      </div>
      <div>
        <label className="mb-2 block" htmlFor="description">
          Description
        </label>
        <textarea
          className="border block w-full p-4"
          id="description"
          name="description"
          rows={6}
          placeholder="Enter description here"
        ></textarea>
      </div>
      <div className="grid grid-cols-2 gap-10">
        <div>
          <label className="mb-2 block" htmlFor="priority">
            Priority
          </label>
          <select
            name="priority"
            id="priority"
            className="w-full block border p-4"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block" htmlFor="status">
            Status
          </label>
          <select name="status" id="status" className="block w-full border p-4">
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
      {state?.error && (
        <p className="text-red-500 text-[.9rem] text-center">{state?.error}</p>
      )}
      <button
        type="submit"
        className={cn(buttonVariants({ size: "lg" }), "w-full mt-4")}
        disabled={isLoading}
      >
        <PlusIcon />
        {isLoading ? "Loading..." : isEditing ? "Update Task" : "Create Task"}
      </button>
    </form>
  );
}
