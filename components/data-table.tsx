"use client";

import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Status, Priority, taskSchemaTableType } from "@/lib/zodSchemas";
import { formatRelativeTime } from "@/lib/utils";
import { TASK_PRIORITY, TASK_STATUS } from "@/db/schema";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

export function DataTable({ data }: { data: taskSchemaTableType[] }) {
  const router = useRouter();
  return (
    <div className="overflow-x-auto rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>Title</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((task, index) => (
              <TableRow
                key={task.id}
                className="hover:bg-muted/50 cursor-pointer transition"
                onClick={() => router.push(`/tasks/${task.id}`)}
              >
                <TableCell>{task.title}</TableCell>
                <TableCell>
                  <Badge>
                    {TASK_PRIORITY[task.priority as Priority].label}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge>{TASK_STATUS[task.status as Status].label}</Badge>
                </TableCell>
                <TableCell>
                  {formatRelativeTime(new Date(task.createdAt))}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6">
                No tasks found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
