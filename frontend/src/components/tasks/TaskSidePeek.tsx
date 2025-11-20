import { X, Calendar, User, Flag } from "lucide-react";
import { useEffect } from "react";

interface Task {
  id: string;
  title: string;
  description?: string;
  status: "pendiente" | "en progreso" | "completada";
  priority: "baja" | "media" | "alta";
  dueDate?: string;
  assignedTo?: {
    name: string;
    email: string;
  };
  project?: {
    title: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

interface TaskSidePeekProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TaskSidePeek({ task, isOpen, onClose }: TaskSidePeekProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "alta":
        return "text-red-500";
      case "media":
        return "text-yellow-500";
      case "baja":
        return "text-green-500";
      default:
        return "text-slate-400";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pendiente":
        return "Pending";
      case "en progreso":
        return "In Progress";
      case "completada":
        return "Completed";
      default:
        return status;
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "alta":
        return "High";
      case "media":
        return "Medium";
      case "baja":
        return "Low";
      default:
        return priority;
    }
  };

  const formatDate = (date?: string) => {
    if (!date) return "Not set";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!task) return null;

  return (
    <>
      {/* Overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 40,
          transition: 'opacity 300ms ease-in-out',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          visibility: isOpen ? 'visible' : 'hidden'
        }}
        onClick={onClose}
      />

      {/* Side Peek Panel */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100%',
          width: '100%',
          maxWidth: '500px',
          backgroundColor: '#1E2A38',
          borderLeft: '1px solid rgb(71 85 105)',
          boxShadow: '-4px 0 24px rgba(0, 0, 0, 0.3)',
          zIndex: 50,
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 300ms ease-out',
          visibility: isOpen ? 'visible' : 'hidden'
        }}
      >
        <div className="flex flex-col h-full"
          style={{
            opacity: isOpen ? 1 : 0,
            transition: 'opacity 200ms ease-in-out 100ms'
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-600"
            style={{
              transform: isOpen ? 'translateY(0)' : 'translateY(-16px)',
              opacity: isOpen ? 1 : 0,
              transition: 'all 300ms ease-out 150ms'
            }}
          >
            <h2 className="text-xl font-medium text-white">Task Details</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-600 rounded"
              style={{ transition: 'all 200ms ease-in-out' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(90deg)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(0deg)'}
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6"
            style={{
              transform: isOpen ? 'translateY(0)' : 'translateY(16px)',
              opacity: isOpen ? 1 : 0,
              transition: 'all 300ms ease-out 200ms'
            }}
          >
            {/* Title */}
            <div>
              <label className="text-sm font-medium text-slate-400 block mb-2">
                Title
              </label>
              <h3 className="text-lg text-white">{task.title}</h3>
            </div>

            {/* Description */}
            {task.description && (
              <div>
                <label className="text-sm font-medium text-slate-400 block mb-2">
                  Description
                </label>
                <p className="text-white">{task.description}</p>
              </div>
            )}

            {/* Status */}
            <div>
              <label className="text-sm font-medium text-slate-400 block mb-2">
                Status
              </label>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-md text-sm ${
                  task.status === "completada"
                    ? "bg-green-500/20 text-green-400"
                    : task.status === "en progreso"
                    ? "bg-blue-500/20 text-blue-400"
                    : "bg-slate-600 text-slate-300"
                }`}
              >
                {getStatusLabel(task.status)}
              </span>
            </div>

            {/* Priority */}
            <div>
              <label className="text-sm font-medium text-slate-400 block mb-2 flex items-center gap-2">
                <Flag className="w-4 h-4" />
                Priority
              </label>
              <span className={`font-medium ${getPriorityColor(task.priority)}`}>
                {getPriorityLabel(task.priority)}
              </span>
            </div>

            {/* Due Date */}
            <div>
              <label className="text-sm font-medium text-slate-400 block mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Due Date
              </label>
              <p className="text-white">{formatDate(task.dueDate)}</p>
            </div>

            {/* Assigned To */}
            {task.assignedTo && (
              <div>
                <label className="text-sm font-medium text-slate-400 block mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Assigned To
                </label>
                <div className="text-white">
                  <p className="font-medium">{task.assignedTo.name}</p>
                  <p className="text-sm text-slate-400">{task.assignedTo.email}</p>
                </div>
              </div>
            )}

            {/* Project */}
            {task.project && (
              <div>
                <label className="text-sm font-medium text-slate-400 block mb-2">
                  Project
                </label>
                <p className="text-white">{task.project.title}</p>
              </div>
            )}

            {/* Timestamps */}
            <div className="pt-4 border-t border-slate-600 space-y-2">
              {task.createdAt && (
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Created</span>
                  <span className="text-white">{formatDate(task.createdAt)}</span>
                </div>
              )}
              {task.updatedAt && (
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Last Updated</span>
                  <span className="text-white">{formatDate(task.updatedAt)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-slate-600"
            style={{
              transform: isOpen ? 'translateY(0)' : 'translateY(16px)',
              opacity: isOpen ? 1 : 0,
              transition: 'all 300ms ease-out 250ms'
            }}
          >
            <button
              onClick={onClose}
              className="w-full py-2 px-4 rounded-md text-base"
              style={{
                backgroundColor: '#95B2EE',
                color: '#1E2A38',
                transition: 'all 200ms ease-in-out'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#7a9de6';
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#95B2EE';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
