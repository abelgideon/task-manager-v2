import UnauthorizedPage from "@/app/unauthorized/page";
import { getSession } from "@/lib/auth";
import { TaskForm } from "../_components/TaskForm";

export default async function NewTaskPage() {
  const session = await getSession();

  if (!session) {
    return <UnauthorizedPage />;
  }
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Create New Task</h1>
      <TaskForm />
    </>
  );
}
