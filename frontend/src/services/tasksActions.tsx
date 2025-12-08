import api from "./api";

interface CreateTaskData {
  title: string;
  description?: string;
  status?: "pendiente" | "en progreso" | "completada";
  priority?: "baja" | "media" | "alta";
  assignedTo?: string;
  dueDate?: string;
}

interface UpdateTaskData {
  title?: string;
  description?: string;
  status?: "pendiente" | "en progreso" | "completada";
  priority?: "baja" | "media" | "alta";
  assignedTo?: string;
  dueDate?: string;
}

// Create a new task in a project
export const createTask = async (projectId: string, taskData: CreateTaskData) => {
  try {
    const response = await api.post(`/tasks/project/${projectId}`, taskData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to create task");
  }
};

// Get all tasks for a specific project
export const getTasksByProject = async (projectId: string) => {
  try {
    const response = await api.get(`/tasks/project/${projectId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch tasks");
  }
};

// Get all tasks assigned to a user
export const getTasksByUser = async (userId: string) => {
  try {
    const response = await api.get(`/tasks/user/${userId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch user tasks");
  }
};

// Get a single task by ID
export const getTaskById = async (taskId: string) => {
  try {
    const response = await api.get(`/tasks/${taskId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch task");
  }
};

// Update a task by ID
export const updateTask = async (taskId: string, taskData: UpdateTaskData) => {
  try {
    const response = await api.put(`/tasks/${taskId}`, taskData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to update task");
  }
};

// Mark a task as completed
export const markTaskAsCompleted = async (taskId: string) => {
  try {
    const response = await api.patch(`/tasks/${taskId}/complete`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to mark task as completed");
  }
};

// Delete a task by ID
export const deleteTask = async (taskId: string) => {
  try {
    const response = await api.delete(`/tasks/${taskId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to delete task");
  }
};
