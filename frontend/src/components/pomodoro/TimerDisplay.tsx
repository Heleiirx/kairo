interface TimerDisplayProps {
  timeLeft: number;
  sessionLabel: string;
  mode: "pomodoro" | "flowclock";
}

export default function TimerDisplay({ timeLeft, sessionLabel, mode }: TimerDisplayProps) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const radius = 140;
  const circumference = 2 * Math.PI * radius;
  const progress = mode === "pomodoro" ? (timeLeft / (25 * 60)) : 0;
  const strokeDashoffset = circumference * (1 - progress);

  // Calculate dot position (angle in radians)
  const angle = mode === "pomodoro" ? (1 - progress) * 2 * Math.PI : 0;
  const dotX = 160 + radius * Math.cos(angle);
  const dotY = 160 + radius * Math.sin(angle);

  return (
    <div className="relative flex items-center justify-center mb-8">
      <svg className="w-80 h-80 -rotate-90">
        <circle
          cx="160"
          cy="160"
          r={radius}
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-white/20"
        />
        {mode === "pomodoro" && (
          <>
            <circle
              cx="160"
              cy="160"
              r={radius}
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="text-white transition-all duration-1000"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
            <circle
              cx={dotX}
              cy={dotY}
              r="6"
              fill="currentColor"
              className="text-white transition-all duration-1000"
            />
          </>
        )}
      </svg>
      <div className="absolute flex flex-col items-center">
        <div className="text-6xl font-medium text-white">
          {formattedTime}
        </div>
        <div className="text-base text-white/80 mt-2">
          {sessionLabel}
        </div>
      </div>
    </div>
  );
}
