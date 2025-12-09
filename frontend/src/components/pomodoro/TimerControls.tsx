import { Play, RotateCcw, X, Pause } from "lucide-react";

interface TimerControlsProps {
  isRunning: boolean;
  onPlayPause: () => void;
  onReset: () => void;
  onStop: () => void;
  onTogglePiP?: () => void;
  isPiPActive?: boolean;
  isPiPSupported?: boolean;
}

export default function TimerControls({ 
  isRunning, 
  onPlayPause, 
  onReset, 
  onStop,
  // onTogglePiP,
  // isPiPActive = false,
  // isPiPSupported = false
}: TimerControlsProps) {
  return (
    <div className="flex items-center gap-4 md:gap-6">
      <button
        onClick={onPlayPause}
        className="p-4 rounded-full hover:bg-white/10 transition-colors min-w-[64px] min-h-[64px] flex items-center justify-center"
        aria-label={isRunning ? "Pause" : "Play"}
      >
        {isRunning ? (
          <Pause strokeWidth={1} className="h-7 w-7 text-white" />
        ) : (
          <Play strokeWidth={1} className="h-7 w-7 text-white" />
        )}
      </button>
      <button
        onClick={onReset}
        className="p-4 md:p-5 rounded-full hover:bg-white/10 transition-colors min-w-[64px] min-h-[64px] flex items-center justify-center"
        aria-label="Reset"
      >
        <RotateCcw strokeWidth={1} className="h-7 w-7 text-white" />
      </button>
      <button
        onClick={onStop}
        className="p-4 md:p-5 rounded-full hover:bg-white/10 transition-colors min-w-[64px] min-h-[64px] flex items-center justify-center"
        aria-label="Stop"
      >
        <X strokeWidth={1} className="h-7 w-7 text-white" />
      </button>
      {/* {isPiPSupported && onTogglePiP && (
        <button
          onClick={onTogglePiP}
          className={`hidden md:flex p-4 md:p-5 rounded-full hover:bg-white/10 transition-colors min-w-[64px] min-h-[64px] items-center justify-center ${
            isPiPActive ? 'bg-white/20' : ''
          }`}
          aria-label="Picture in Picture"
          title="Picture in Picture"
        >
          <PictureInPicture strokeWidth={1} className="h-7 w-7 text-white" />
        </button>
      )} */}
    </div>
  );
}
