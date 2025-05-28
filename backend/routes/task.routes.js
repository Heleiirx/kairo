import express from "express";
import {
  createTask,
  getTasksByProject,
  getTaskById,
  updateTask,
  deleteTask,
  getTasksByUser,
  markTaskAsCompleted,
  filterTasksByProject,
} from "../controllers/task.controller.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Relacionadas con proyectos
router.post("/project/:projectId", verifyToken, createTask);
router.get("/project/:projectId", verifyToken, getTasksByProject);
router.get("/project/:projectId/filter", verifyToken, filterTasksByProject);
router.patch("/project/:projectId/:taskId/complete", verifyToken, markTaskAsCompleted);

// Relacionadas con usuarios
router.get("/user/:userId", verifyToken, getTasksByUser);

// Operaciones generales sobre tareas
router.get("/:taskId", verifyToken, getTaskById);
router.put("/:taskId", verifyToken, updateTask);
router.delete("/:taskId", verifyToken, deleteTask);

export default router;
