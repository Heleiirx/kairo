import { useState } from "react";

function FocusTimer() {
  const [time] = useState(25);
  const [isRunning, setIsRunning] = useState(false);

  return (
    <div className="bg-primary rounded-lg p-4 min-h-[100px] flex flex-col">
      <p className="text-xs text-secondary mb-1">Clock</p>
      <h3 className="text-white font-medium text-sm mb-2">Focus on last task</h3>
      <div className="flex items-center justify-center flex-1 py-2">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="58"
              stroke="#2A3F5F"
              strokeWidth="3"
              fill="none"
            />
            <circle
              cx="64"
              cy="64"
              r="58"
              stroke="#95B2EE"
              strokeWidth="3"
              fill="none"
              strokeDasharray={364}
              strokeDashoffset={91}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs text-secondary">Focus</span>
            <span className="text-2xl font-bold text-white">{time}:00</span>
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="mt-1 min-h-[44px] min-w-[44px] px-4 py-2 border border-secondary text-secondary text-xs rounded hover:bg-secondary hover:text-white transition"
            >
              {isRunning ? "Pause" : "Start"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FocusTimer;
