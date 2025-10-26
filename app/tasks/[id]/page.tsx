import { getSingleTask } from "@/app/data/task/get-single-task";
import { UpdateTaskForm } from "./_components/UpdateTaskForm";
import { notFound } from "next/navigation";

export default async function SingleTaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: taskId } = await params;

  const task = await getSingleTask(taskId);

  if (!task) {
    return notFound();
  }

  return <UpdateTaskForm task={task} />;
}
