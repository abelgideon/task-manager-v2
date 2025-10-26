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
import { DataTable } from "@/components/data-table";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) {
    return <UnauthorizedPage />;
  }
  const tasks = await getAllTasks(session?.userId);

  const tableData = tasks?.map((task) => ({
    ...task,
    description: task.description ?? undefined,
  }));

  return (
    <div>
      {tableData && tableData.length > 0 ? (
        <DataTable data={tableData} />
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
