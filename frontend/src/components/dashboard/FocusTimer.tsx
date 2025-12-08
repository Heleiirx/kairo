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
            <div className="flex gap-2 mt-2">
              {!isRunning ? (
                <button
                  onClick={() => setIsRunning(true)}
                  className="w-6 h-6 rounded-full bg-accent hover:bg-secondary/30 flex items-center justify-center transition-colors"
                  aria-label="Play"
                >
                  <svg className="w-3 h-3 text-white ml-0.5" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M3 2v12l10-6L3 2z" />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={() => setIsRunning(false)}
                  className="w-6 h-6 rounded-full bg-accent hover:bg-secondary/30 flex items-center justify-center transition-colors"
                  aria-label="Pause"
                >
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5 3h2v10H5V3zm4 0h2v10H9V3z" />
                  </svg>
                </button>
              )}
              <button
                onClick={() => setIsRunning(false)}
                className="w-6 h-6 rounded-full bg-accent hover:bg-secondary/30 flex items-center justify-center transition-colors"
                aria-label="Stop"
              >
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M4 4h8v8H4V4z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FocusTimer;
