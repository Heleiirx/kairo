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
    <div className="flex items-center gap-4 md:gap-6 mb-6 md:mb-8">
      <button
        onClick={onPlayPause}
        className="p-4 md:p-5 rounded-full hover:bg-white/10 transition-colors min-w-[64px] min-h-[64px] flex items-center justify-center"
        aria-label={isRunning ? "Pause" : "Play"}
      >
        {isRunning ? (
          <Pause className="h-7 w-7 md:h-8 md:w-8 text-white" />
        ) : (
          <Play className="h-7 w-7 md:h-8 md:w-8 text-white" />
        )}
      </button>
      <button
        onClick={onReset}
        className="p-4 md:p-5 rounded-full hover:bg-white/10 transition-colors min-w-[64px] min-h-[64px] flex items-center justify-center"
        aria-label="Reset"
      >
        <RotateCcw className="h-7 w-7 md:h-8 md:w-8 text-white" />
      </button>
      <button
        onClick={onStop}
        className="p-4 md:p-5 rounded-full hover:bg-white/10 transition-colors min-w-[64px] min-h-[64px] flex items-center justify-center"
        aria-label="Stop"
      >
        <X className="h-7 w-7 md:h-8 md:w-8 text-white" />
      </button>
    </div>
  );
}
