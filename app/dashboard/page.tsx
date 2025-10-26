import { getAllTasks } from "../data/task/get-all-tasks";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { DataTable } from "@/components/data-table";

export default async function DashboardPage() {
  const tasks = await getAllTasks();

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
