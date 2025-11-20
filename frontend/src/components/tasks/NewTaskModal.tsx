import { useState } from "react";
import ModalXL from "../ModalXL";
import FlotatingInput from "../FlotatingInput";
import { createTask } from "../../services/tasksActions";

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  onTaskCreated?: () => void;
}

function NewTaskModal({ isOpen, onClose, projectId, onTaskCreated }: NewTaskModalProps) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    project: "",
    category: "",
    priority: "High",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.id.replace("task", "").toLowerCase()]: e.target.value });
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
    
    setError("");
    setLoading(true);

    try {
      await createTask(projectId, {
        title: form.name,
        description: form.description,
        priority: mapPriorityToBackend(form.priority),
        status: "pendiente"
      });

      setForm({
        name: "",
        description: "",
        project: "",
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
        <h2 className="text-xl md:text-2xl mb-2 md:mb-4">Create New Task</h2>
        
        {/* Stack form fields vertically with appropriate spacing */}
        <div className="space-y-4">
          <FlotatingInput
            id="taskName"
            label="Task Name"
            type="text"
            value={form.name}
            onChange={handleChange}
            required
          />
          <FlotatingInput
            id="taskDescription"
            label="Description"
            type="text"
            value={form.description}
            onChange={handleChange}
          />
          <FlotatingInput
            id="taskProject"
            label="Project"
            type="text"
            value={form.project}
            onChange={handleChange}
          />
          <FlotatingInput
            id="taskCategory"
            label="Category"
            type="text"
            value={form.category}
            onChange={handleChange}
          />
          
          {/* Touch-friendly dropdown with minimum 44px height */}
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