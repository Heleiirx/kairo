interface StatCardProps {
  percentage: number;
  label: string;
  color?: string;
}

function StatCard({ percentage, label, color = "#95B2EE" }: StatCardProps) {
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-primary rounded-lg p-4 flex items-center gap-3 min-h-[100px]">
      <div className="relative w-16 h-16 flex-shrink-0">
        <svg className="w-16 h-16 transform -rotate-90">
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="#2A3F5F"
            strokeWidth="6"
            fill="none"
          />
          <circle
            cx="32"
            cy="32"
            r="28"
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
