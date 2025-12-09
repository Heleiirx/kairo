interface PriorityIndicatorProps {
    priority: string
  }
  
  export function PriorityIndicator({ priority }: PriorityIndicatorProps) {
    const getPriorityStyle = (priority: string) => {
      switch (priority) {
        case "alta":
          return { backgroundColor: "#ef4444" } // red-500
        case "media":
          return { backgroundColor: "#eab308" } // yellow-500
        case "baja":
          return { backgroundColor: "#22c55e" } // green-500
        default:
          return { backgroundColor: "#6b7280" } // gray-500
      }
    }
  
    return (
      <div className="flex items-center space-x-2">
        <div 
          className="w-2 h-2 rounded-full" 
          style={getPriorityStyle(priority)}
        ></div>
        <span className="text-slate-300">{priority}</span>
      </div>
    )
  }