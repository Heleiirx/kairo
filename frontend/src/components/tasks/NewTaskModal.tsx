import { useState } from "react";
import ModalXL from "../ModalXL";
import FlotatingInput from "../FlotatingInput";

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTask?: (task: {
    name: string;
    description: string;
    project: string;
    category: string;
    priority: string;
  }) => void;
}

function NewTaskModal({ isOpen, onClose, onCreateTask }: NewTaskModalProps) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    project: "",
    category: "",
    priority: "High",
  });
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.id.replace("task", "").toLowerCase()]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError("Task name is required.");
      return;
    }
    setError("");
    onCreateTask?.(form);
    setForm({
      name: "",
      description: "",
      project: "",
      category: "",
      priority: "High",
    });
    onClose();
  };

  return (
    <ModalXL onClose={onClose}>
      <form className="flex flex-col gap-4 bg-base p-8 shadow-xl/30 border-t-4 border-base-contrast" onSubmit={handleSubmit}>
        <h2 className="text-xl">Create New Task</h2>
        <div className="grid grid-cols-2 gap-4">  
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
        </div>
        <div className="grid grid-cols-2 gap-4">
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
        </div>
        <div>
          <label htmlFor="taskPriority" className="block mb-2 text-sm font-medium text-white">Priority</label>
          <select
            id="taskPriority"
            className="bg-base border border-gray-300 text-white text-sm rounded-lg block w-full p-2.5"
            value={form.priority}
            onChange={handleChange}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        {error && <div className="text-red-400 text-sm">{error}</div>}
        <div className="flex justify-end gap-4 mt-4">
          <button type="button" onClick={onClose} className="py-2 px-4 rounded-md bg-gray-600 hover:bg-gray-700 transition-colors">
            Cancel
          </button>
          <button type="submit" className="py-2 px-4 rounded-md bg-secondary text-base hover:bg-blue-500 transition-colors">
            Create Task
          </button>
        </div>
      </form>
    </ModalXL>
  );
}

export default NewTaskModal;