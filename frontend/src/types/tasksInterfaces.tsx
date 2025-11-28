export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: "pendiente" | "en progreso" | "completada";
  priority: "baja" | "media" | "alta";
  time?: string; // Optional - time spent on task
  project?: {
    _id: string;
    title: string;
  };
  category?: string;
  assignedTo?: {
    _id: string;
    name: string;
    email: string;
  };
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}