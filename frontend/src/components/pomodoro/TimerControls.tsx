import { Play, RotateCcw, X, Pause } from "lucide-react";

interface TimerControlsProps {
  isRunning: boolean;
  onPlayPause: () => void;
  onReset: () => void;
  onStop: () => void;
}

export default function TimerControls({ 
  isRunning, 
  onPlayPause, 
  onReset, 
  onStop 
}: TimerControlsProps) {
  return (
    <div className="flex items-center gap-6 mb-8">
      <button
        onClick={onPlayPause}
        className="p-3 rounded-full hover:bg-white/10 transition-colors"
        aria-label={isRunning ? "Pause" : "Play"}
      >
        {isRunning ? (
          <Pause className="h-6 w-6 text-white" />
        ) : (
          <Play className="h-6 w-6 text-white" />
        )}
      </button>
      <button
        onClick={onReset}
        className="p-3 rounded-full hover:bg-white/10 transition-colors"
        aria-label="Reset"
      >
        <RotateCcw className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={onStop}
        className="p-3 rounded-full hover:bg-white/10 transition-colors"
        aria-label="Stop"
      >
        <X className="h-6 w-6 text-white" />
      </button>
    </div>
  );
}
