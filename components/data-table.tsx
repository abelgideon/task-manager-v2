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

export function DataTable({ data }: { data: taskSchemaTableType[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
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
              >
                <TableCell>
                  <Link href={`/tasks/${task.id}`} className="hover:underline">
                    {task.title}
                  </Link>
                </TableCell>
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
