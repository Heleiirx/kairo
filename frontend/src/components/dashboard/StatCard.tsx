interface StatCardProps {
  percentage: number;
  label: string;
  color?: string;
}

function StatCard({ percentage, label, color = "#95B2EE" }: StatCardProps) {
  const radius = 28;
  // Calculate the complete outline of the circle
  const circumference = 2 * Math.PI * radius;
  // Calculate how much of the base circle is hidden
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-primary rounded-lg p-4 flex items-center gap-3 min-h-[100px] h-16">
      <div className="relative w-16 h-16 flex-shrink-0">
        {/* Base circle */}
        <svg className="w-16 h-16 transform -rotate-90">
          <circle
            cx="32"
            cy="32"
            r={radius}
            stroke="#2A3F5F"
            strokeWidth="6"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx="32"
            cy="32"
            r={radius}
            stroke={color}
            strokeWidth="6"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-white">{percentage}%</span>
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-secondary">Statics</p>
        <p className="text-white text-sm font-medium break-words">{label}</p>
      </div>
    </div>
  );
}

export default StatCard;
