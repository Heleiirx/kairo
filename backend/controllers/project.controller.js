import Project from "../models/Project.js";

// Crear un nuevo proyecto
export const createProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el proyecto", error: error.message });
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
        message: "Error al obtener los proyectos",
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
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el proyecto", error: error.message });
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
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({
        message: "Error al actualizar el proyecto",
        error: error.message,
      });
  }
};

// Eliminar un proyecto
export const deleteProject = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }
    res.status(200).json({ message: "Proyecto eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el proyecto", error: error.message });
  }
};
