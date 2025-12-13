export interface Project {
  _id: string;
  title: string;
  category?: string;
  description?: string;
  status: "pendiente" | "en progreso" | "completado";
  priority: "baja" | "media" | "alta";
  progress: number;
  taskCount: number;
  timeSpent: number;
  startDate?: string;
  endDate?: string;
  assignedUsers?: Array<{
    _id: string;
    name: string;
    email: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectCardDisplay {
  id: string;
  title: string;
  category: string;
  tasks: {
    completed: number;
    total: number;
  };
  time: string;
  progress: number;
  color: string;
  completed: boolean;
}
