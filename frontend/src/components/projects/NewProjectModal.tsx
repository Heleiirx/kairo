import { useState } from "react";
import ModalXL from "../ModalXL";
import FlotatingInput from "../FlotatingInput";

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectCreated?: () => void;
}

function NewProjectModal({ isOpen, onClose, onProjectCreated }: NewProjectModalProps) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    priority: "media",
    status: "pendiente",
    startDate: "",
    endDate: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const fieldName = e.target.id.replace("project", "").toLowerCase();
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError("Project title is required.");
      return;
    }
    
    setError("");
    setLoading(true);

    try {
      // TODO: Replace with actual API call
      // await createProject({
      //   title: form.title,
      //   description: form.description,
      //   category: form.category,
      //   priority: form.priority,
      //   status: form.status,
      //   startDate: form.startDate,
      //   endDate: form.endDate
      // });

      console.log("Creating project:", form);

      setForm({
        title: "",
        description: "",
        category: "",
        priority: "media",
        status: "pendiente",
        startDate: "",
        endDate: ""
      });
      
      onProjectCreated?.();
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalXL onClose={onClose}>
      <form 
        className="flex flex-col gap-4 bg-base p-8 shadow-xl/30 border-t-4 border-base-contrast rounded-lg max-w-2xl" 
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-medium text-white mb-2">Create New Project</h2>
        
        {/* Title and Category */}
        <div className="grid grid-cols-2 gap-4">  
          <FlotatingInput
            id="projectTitle"
            label="Project Title"
            type="text"
            value={form.title}
            onChange={handleChange}
            required
          />
          <FlotatingInput
            id="projectCategory"
            label="Category"
            type="text"
            value={form.category}
            onChange={handleChange}
          />
        </div>

        {/* Description */}
        <div>
          <FlotatingInput
            id="projectDescription"
            label="Description"
            type="text"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        {/* Priority and Status */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="projectPriority" className="block mb-2 text-sm font-medium text-white">
              Priority
            </label>
            <select
              id="projectPriority"
              className="bg-primary border border-white/20 text-white text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:border-secondary"
              value={form.priority}
              onChange={handleChange}
            >
              <option value="baja">Low</option>
              <option value="media">Medium</option>
              <option value="alta">High</option>
            </select>
          </div>

          <div>
            <label htmlFor="projectStatus" className="block mb-2 text-sm font-medium text-white">
              Status
            </label>
            <select
              id="projectStatus"
              className="bg-primary border border-white/20 text-white text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:border-secondary"
              value={form.status}
              onChange={handleChange}
            >
              <option value="pendiente">Pending</option>
              <option value="en progreso">In Progress</option>
              <option value="completado">Completed</option>
            </select>
          </div>
        </div>

        {/* Start and End Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="projectStartdate" className="block mb-2 text-sm font-medium text-white">
              Start Date
            </label>
            <input
              id="projectStartdate"
              type="date"
              className="bg-primary border border-white/20 text-white text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:border-secondary"
              value={form.startDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="projectEnddate" className="block mb-2 text-sm font-medium text-white">
              End Date
            </label>
            <input
              id="projectEnddate"
              type="date"
              className="bg-primary border border-white/20 text-white text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:border-secondary"
              value={form.endDate}
              onChange={handleChange}
            />
          </div>
        </div>

        {error && <div className="text-red-400 text-sm">{error}</div>}
        
        <div className="flex justify-end gap-4 mt-4">
          <button 
            type="button" 
            onClick={onClose} 
            className="py-2 px-6 rounded-md bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={loading}
            className="py-2 px-6 rounded-md bg-secondary text-primary font-medium hover:bg-secondary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating..." : "Create Project"}
          </button>
        </div>
      </form>
    </ModalXL>
  );
}

export default NewProjectModal;
