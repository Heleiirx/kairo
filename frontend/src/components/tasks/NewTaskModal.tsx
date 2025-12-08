import { useState, useEffect } from "react";
import ModalXL from "../ModalXL";
import FlotatingInput from "../FlotatingInput";
import { createTask } from "../../services/tasksActions";
import { getProjectsByUser } from "../../services/projectActions";
import { useAuthStore } from "../../store/authStore";
import { type Project } from "../../types/projectInterfaces";

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId?: string;
  onTaskCreated?: () => void;
}

function NewTaskModal({ isOpen, onClose, projectId, onTaskCreated }: NewTaskModalProps) {
  const user = useAuthStore((state) => state.user);
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    project: projectId || "",
    category: "",
    priority: "High",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(false);

  // Fetch user projects when modal opens
  useEffect(() => {
    if (isOpen && user?.id) {
      fetchProjects();
    }
  }, [isOpen, user?.id]);

  const fetchProjects = async () => {
    if (!user?.id) return;
    
    try {
      setLoadingProjects(true);
      const fetchedProjects = await getProjectsByUser(user.id);
      setProjects(fetchedProjects);
      
      // Extract unique categories from projects
      const uniqueCategories = Array.from(
        new Set(
          fetchedProjects
            .map((p: Project) => p.category)
            .filter((c: string | undefined): c is string => !!c)
        )
      ) as string[];
      setCategories(uniqueCategories);
      
      // Set default project if provided
      if (projectId && !form.project) {
        setForm(prev => ({ ...prev, project: projectId }));
      }
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    } finally {
      setLoadingProjects(false);
    }
  };

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const fieldName = e.target.id.replace("task", "").toLowerCase();
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const mapPriorityToBackend = (priority: string) => {
    const priorityMap: { [key: string]: "baja" | "media" | "alta" } = {
      "Low": "baja",
      "Medium": "media",
      "High": "alta"
    };
    return priorityMap[priority] || "media";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError("Task name is required.");
      return;
    }
    
    if (!form.category) {
      setError("Please select a category.");
      return;
    }
    
    setError("");
    setLoading(true);

    try {
      // Use selected project or first available project as fallback
      const selectedProjectId = form.project || (projects.length > 0 ? projects[0]._id : "");
      
      if (!selectedProjectId) {
        setError("No projects available. Please create a project first.");
        setLoading(false);
        return;
      }

      await createTask(selectedProjectId, {
        title: form.name,
        description: form.description,
        priority: mapPriorityToBackend(form.priority),
        status: "pendiente"
      });

      setForm({
        name: "",
        description: "",
        project: projectId || "",
        category: "",
        priority: "High",
      });
      
      onTaskCreated?.();
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalXL onClose={onClose}>
      <form className="flex flex-col gap-4 bg-base p-4 md:p-6 lg:p-8 shadow-xl/30 border-t-4 border-base-contrast rounded-lg" onSubmit={handleSubmit}>
        <div className="flex items-center justify-between mb-2 md:mb-4">
          <h2 className="text-xl md:text-2xl">Create New Task</h2>
          <button
            type="button"
            onClick={onClose}
            className="md:hidden text-white hover:text-gray-300 p-2 -mr-2"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Two-column layout for tablet/desktop, single column for mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Column */}
          <div className="space-y-4">
            <FlotatingInput
              id="taskName"
              label="Task Name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
            />
            
            {/* Project Select */}
            <div>
              <label htmlFor="taskProject" className="block mb-2 text-sm font-medium text-white">
                Project
              </label>
              <select
                id="taskProject"
                className="bg-base border border-gray-300 text-white text-base rounded-lg block w-full px-4 py-3 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                value={form.project}
                onChange={handleChange}
                disabled={loadingProjects}
              >
                <option value="">
                  {loadingProjects ? "Loading projects..." : "Select a project (optional)"}
                </option>
                {projects.map((project) => (
                  <option key={project._id} value={project._id}>
                    {project.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Priority Select */}
            <div>
              <label htmlFor="taskPriority" className="block mb-2 text-sm font-medium text-white">Priority</label>
              <select
                id="taskPriority"
                className="bg-base border border-gray-300 text-white text-base rounded-lg block w-full px-4 py-3 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                value={form.priority}
                onChange={handleChange}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <FlotatingInput
              id="taskDescription"
              label="Description"
              type="text"
              value={form.description}
              onChange={handleChange}
            />

            {/* Category Select */}
            <div>
              <label htmlFor="taskCategory" className="block mb-2 text-sm font-medium text-white">
                Category <span className="text-red-400">*</span>
              </label>
              <select
                id="taskCategory"
                className="bg-base border border-gray-300 text-white text-base rounded-lg block w-full px-4 py-3 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                value={form.category}
                onChange={handleChange}
                required
                disabled={categories.length === 0}
              >
                <option value="">
                  {categories.length === 0 ? "No categories available" : "Select a category"}
                </option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {error && <div className="text-red-400 text-sm mt-2">{error}</div>}
        
        {/* Full width buttons on mobile, side by side on desktop */}
        <div className="flex flex-col md:flex-row justify-end gap-3 pt-4">
          <button 
            type="button" 
            onClick={onClose} 
            className="w-full md:w-auto py-3 px-6 rounded-md bg-gray-600 hover:bg-gray-700 transition-colors min-h-[44px] text-base font-medium"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full md:w-auto py-3 px-6 rounded-md bg-secondary text-base hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] font-medium"
          >
            {loading ? "Creating..." : "Create Task"}
          </button>
        </div>
      </form>
    </ModalXL>
  );
}

export default NewTaskModal;