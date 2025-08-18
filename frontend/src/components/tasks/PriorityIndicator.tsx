interface PriorityIndicatorProps {
    priority: string
  }
  
  export function PriorityIndicator({ priority }: PriorityIndicatorProps) {
    const getPriorityColor = (priority: string) => {
      switch (priority) {
        case "High":
          return "bg-red-500"
        case "Medium":
          return "bg-green-500"
        case "Low":
          return "bg-yellow-500"
        default:
          return "bg-gray-500"
      }
    }
  
    return (
      <div className="flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full ${getPriorityColor(priority)}`}></div>
        <span className="text-slate-300">{priority}</span>
      </div>
    )
  }