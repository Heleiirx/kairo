import api from "./api";
import { type Project } from "../types/projectInterfaces";

export interface CreateProjectData {
  title: string;
  description?: string;
  category?: string;
  status?: "pendiente" | "en progreso" | "completado";
  priority?: "baja" | "media" | "alta";
  startDate?: string;
  endDate?: string;
}

// Get all projects for the authenticated user
export const getProjects = async (): Promise<Project[]> => {
  try {
    const response = await api.get("/projects");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch projects");
  }
};

// Get projects by user ID
export const getProjectsByUser = async (userId: string): Promise<Project[]> => {
  try {
    const response = await api.get(`/projects/user/${userId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch user projects");
  }
};

// Get a single project by ID
export const getProjectById = async (projectId: string): Promise<Project> => {
  try {
    const response = await api.get(`/projects/${projectId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch project");
  }
};

// Create a new project
export const createProject = async (projectData: CreateProjectData): Promise<Project> => {
  try {
    const response = await api.post("/projects", projectData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to create project");
  }
};

// Update a project
export const updateProject = async (projectId: string, projectData: Partial<CreateProjectData>): Promise<Project> => {
  try {
    const response = await api.put(`/projects/${projectId}`, projectData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to update project");
  }
};

// Delete a project
export const deleteProject = async (projectId: string): Promise<{ message: string }> => {
  try {
    const response = await api.delete(`/projects/${projectId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to delete project");
  }
};

// Get project with all its tasks
export const getProjectWithTasks = async (projectId: string): Promise<Project> => {
  try {
    const response = await api.get(`/projects/${projectId}/full`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch project with tasks");
  }
};
