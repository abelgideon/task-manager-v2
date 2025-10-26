"use client";
import {
  createTaskAction,
  deleteTaskAction,
  updateTaskAction,
} from "@/app/actions/tasks";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ActionResponse, taskSchemaType } from "@/lib/zodSchemas";
import { PlusIcon, Trash2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useActionState, useTransition } from "react";
import { toast } from "sonner";

const initialState: ActionResponse = {
  success: false,
  message: "",
  errors: undefined,
};

type UpdateTaskFormProps = {
  task: {
    id: string;
    title: string;
    description: string | null;
    status: "pending" | "in_progress" | "completed";
    priority: "low" | "medium" | "high";
  };
};

export function UpdateTaskForm({ task }: { task: taskSchemaType }) {
  const [isPending, startTransition] = useTransition();
  const { id: taskId } = useParams();
  const router = useRouter();

  const [state, formAction, isLoading] = useActionState<
    ActionResponse,
    FormData
  >(async (prevState: ActionResponse, formData: FormData) => {
    try {
      const result = await updateTaskAction(taskId as string, formData);

      if (result.success) {
        toast.success("Task Updated Successfully");
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

  const handleDelete = async () => {
    startTransition(async () => {
      try {
        await deleteTaskAction(taskId as string);

        toast.success("Task Deleted Successfully");
        router.push("/dashboard");
      } catch (e) {
        toast.error("Something went wrong");
      }
    });
  };

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-6">Update Task</h1>
        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={isPending}
        >
          <Trash2 />
          {isPending ? "Deleting..." : "Delete Task"}
        </Button>
      </div>

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
            defaultValue={task.title}
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
            defaultValue={task.description}
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
              defaultValue={task.priority}
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
            <select
              name="status"
              id="status"
              className="block w-full border p-4"
              defaultValue={task.status}
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
        {state?.error && (
          <p className="text-red-500 text-[.9rem] text-center">
            {state?.error}
          </p>
        )}
        <button
          type="submit"
          className={cn(buttonVariants({ size: "lg" }), "w-full mt-4")}
          disabled={isLoading}
        >
          <PlusIcon />
          {isLoading ? "Updating..." : "Update Task"}
        </button>
      </form>
    </>
  );
}
