import { getSession } from "@/lib/auth";
import { getAllTasks } from "../data/task/get-all-tasks";
import UnauthorizedPage from "../unauthorized/page";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatRelativeTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { TASK_PRIORITY, TASK_STATUS } from "@/db/schema";
import { Priority, Status } from "@/lib/zodSchemas";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) {
    return <UnauthorizedPage />;
  }
  const tasks = await getAllTasks(session?.userId);

  return (
    <div>
      {tasks && tasks.length > 0 ? (
        <div className="overflow-hidden rounded-lg border shadow-sm">
          {/* Header row */}
          <div className="grid grid-cols-12 gap-4 px-6 py-3 text-sm font-medium text-muted-foreground border-b">
            <div className="col-span-5">Title</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Priority</div>
            <div className="col-span-3">Created</div>
          </div>

          {/* Task rows */}
          <div className="divide-y">
            {tasks.map((task) => (
              <Link
                key={task.id}
                href={`/tasks/${task.id}`}
                className="block hover:bg-gray-50 dark:hover:bg-black/50 transition-colors"
              >
                <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center">
                  <div className="col-span-5 font-medium truncate">
                    {task.title}
                  </div>
                  <div className="col-span-2">
                    <Badge>{TASK_STATUS[task.status as Status].label}</Badge>
                  </div>
                  <div className="col-span-2">
                    <Badge>
                      {TASK_PRIORITY[task.priority as Priority].label}
                    </Badge>
                  </div>
                  <div className="col-span-3 text-sm text-gray-500">
                    {formatRelativeTime(new Date(task.createdAt))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center border rounded-lg p-8">
          <h3 className="text-lg font-medium mb-2">No tasks found</h3>
          <p className="text-muted-foreground mb-6">
            Get started by creating your first task.
          </p>
          <Link href="/tasks/new">
            <Button>
              <span className="flex items-center">
                <PlusIcon size={18} className="mr-2" />
                Create Task
              </span>
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
