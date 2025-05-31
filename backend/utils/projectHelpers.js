import Project from "../models/Project.js";
import Task from "../models/Task.js";

export const updateProjectProgress = async (projectId) => {
  const tasks = await Task.find({ project: projectId });

  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "completada").length;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  await Project.findByIdAndUpdate(projectId, {
    taskCount: total,
    progress: progress,
  });
};
