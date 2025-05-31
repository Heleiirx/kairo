import Task from "../models/Task.js";
import Project from "../models/Project.js";
import { updateProjectProgress } from "../utils/projectHelpers.js";

// Crear una nueva tarea en un proyecto
export const createTask = async (req, res) => {
  const { projectId } = req.params;
  const { title, description, status, assignedTo, dueDate, priority } = req.body;

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const task = await Task.create({
      project: projectId,
      title,
      description,
      status,
      assignedTo,
      dueDate,
      priority,
      // createdBy: req.userId,
    });

    await updateProjectProgress(projectId);

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Obtener todas las tareas de un proyecto
export const getTasksByProject = async (req, res) => {
  const { projectId } = req.params;

  try {
    const tasks = await Task.find({ project: projectId }).populate(
      "assignedTo",
      "name email"
    );
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Obtener una tarea por ID
export const getTaskById = async (req, res) => {
  const { taskId } = req.params;

  try {
    const task = await Task.findById(taskId).populate(
      "assignedTo",
      "name email"
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Actualizar una tarea por ID
export const updateTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    await updateProjectProgress(updatedTask.project);

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Eliminar una tarea por ID
export const deleteTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    await updateProjectProgress(deletedTask.project);

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Obtener todas las tareas asignadas a un usuario específico
export const getTasksByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const tasks = await Task.find({ assignedTo: userId }).populate(
      "project",
      "title"
    );
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener las tareas del usuario",
      error: error.message,
    });
  }
};

// Marcar una tarea como completada
export const markTaskAsCompleted = async (req, res) => {
  const { taskId } = req.params;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { status: "completada" },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    await updateProjectProgress(updatedTask.project);

    res.status(200).json({ message: "Tarea marcada como completada", task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: "Error al marcar la tarea", error: error.message });
  }
};

// Filtrar tareas por estado y prioridad dentro de un proyecto
export const filterTasksByProject = async (req, res) => {
  const { projectId } = req.params;
  const { status, priority } = req.query;

  try {
    const filter = { project: projectId };
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    const tasks = await Task.find(filter);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error al filtrar tareas", error: error.message });
  }
};
