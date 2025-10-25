import { Task } from "@/db/schema";
import { ActionResponse } from "@/lib/zodSchemas";

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
  return <h1>Task Form</h1>;
}
