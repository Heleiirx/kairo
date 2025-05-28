import { Router } from "express";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getProjectsByUser,
} from "../controllers/project.controller.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/", verifyToken, createProject);
router.get("/", verifyToken, getProjects);
router.get("/user/:userId", verifyToken, getProjectsByUser);
router.get("/:id", verifyToken, getProjectById);
router.put("/:id", verifyToken, updateProject);
router.delete("/:id", verifyToken, deleteProject);

export default router;
