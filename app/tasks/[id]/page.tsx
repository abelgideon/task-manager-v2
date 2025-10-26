"use client";

import { TaskForm } from "../_components/TaskForm";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteTaskAction } from "@/app/actions/tasks";
import { useTransition } from "react";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";

export default function SingleTaskPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { id: taskId } = useParams();
  console.log(taskId);
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

      <TaskForm isEditing={true} />
    </>
  );
}
