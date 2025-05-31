import { Router } from "express";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getProjectsByUser,
  getProjectWithTasks,
  assignUsersToProject,
  unassignUsersFromProject,
} from "../controllers/project.controller.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = Router();

// Rutas básicas de proyectos
router.post("/", verifyToken, createProject);
router.get("/", verifyToken, getProjects);
router.get("/:id", verifyToken, getProjectById);
router.put("/:id", verifyToken, updateProject);
router.delete("/:id", verifyToken, deleteProject);

// Relacionadas con usuarios
router.get("/user/:userId", verifyToken, getProjectsByUser);
router.patch("/:projectId/assign-users", verifyToken, assignUsersToProject);
router.patch("/:projectId/unassign-users", verifyToken, unassignUsersFromProject);

// Relacionadas con tareas
router.get("/:projectId/full", verifyToken, getProjectWithTasks);

export default router;
