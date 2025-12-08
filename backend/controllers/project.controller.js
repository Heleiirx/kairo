import Project from "../models/Project.js";
import Task from "../models/Task.js";

// Crear un nuevo proyecto
export const createProject = async (req, res) => {
  try {
    const userId = req.user.id;

    const { assignedUsers = [], ...projectData } = req.body;

    const allAssignedUsers = new Set([...assignedUsers, userId]);

    const project = new Project({
      ...projectData,
      assignedUsers: [...allAssignedUsers],
    });

    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ message: "Error creating the project", error: error.message });
  }
};

// Obtener todos los proyectos
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate(
      "assignedUsers",
      "name email"
    );
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({
      message: "Error obtaining projects",
      error: error.message,
    });
  }
};

// Obtener un proyecto por ID
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate(
      "assignedUsers",
      "name email"
    );
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: "Error obtaining the project", error: error.message });
  }
};

// Actualizar un proyecto
export const updateProject = async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate("assignedUsers", "name email");

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({
      message: "Error updating project",
      error: error.message,
    });
  }
};

// Eliminar un proyecto
export const deleteProject = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ message: "Project successfully removed" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting project", error: error.message });
  }
};

// Obtener proyectos asignados a un usuario
export const getProjectsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const projects = await Project.find({ assignedUsers: userId });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({
      message: "Error obtaining user projects",
      error: error.message,
    });
  }
};

// Obtener un proyecto con sus tareas
export const getProjectWithTasks = async (req, res) => {
  const { projectId } = req.params;

  try {
    const project = await Project.findById(projectId).populate(
      "assignedUsers",
      "name email"
    );
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const tasks = await Task.find({ project: projectId }).populate(
      "assignedTo",
      "name email"
    );

    res.status(200).json({ project, tasks });
  } catch (error) {
    res.status(500).json({
        message: "Error obtaining the project with tasks",
        error: error.message,
      });
  }
};

// Asignar usuarios a un proyecto
export const assignUsersToProject = async (req, res) => {
  const { projectId } = req.params;
  const { userIds } = req.body;

  if (!Array.isArray(userIds)) {
    return res.status(400).json({ message: "userIds must be an array" });
  }

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const currentUserIds = project.assignedUsers.map((id) => id.toString());
    const alreadyAssigned = userIds.filter((id) => currentUserIds.includes(id));

    if (alreadyAssigned.length > 0) {
      return res.status(400).json({
        message: "One or more users are already assigned to this project.",
        alreadyAssigned,
      });
    }

    const updatedUserIds = [...new Set([...currentUserIds, ...userIds])];
    project.assignedUsers = updatedUserIds;
    await project.save();

    res.status(200).json({
      message: "Users correctly assigned",
      assignedUsers: project.assignedUsers,
    });
  } catch (error) {
    res.status(500).json({ message: "Error assigning users", error: error.message });
  }
};

// Desasignar usuarios de un proyecto
export const unassignUsersFromProject = async (req, res) => {
  const { projectId } = req.params;
  const { userIds } = req.body;

  if (!Array.isArray(userIds)) {
    return res.status(400).json({ message: "userIds must be an array" });
  }

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    project.assignedUsers = project.assignedUsers.filter(
      (userId) => !userIds.includes(userId.toString())
    );

    await project.save();

    res.status(200).json({
        message: "Properly unassigned users",
        assignedUsers: project.assignedUsers,
      });
  } catch (error) {
    res.status(500).json({ message: "Error disassigning users", error: error.message });
  }
};
