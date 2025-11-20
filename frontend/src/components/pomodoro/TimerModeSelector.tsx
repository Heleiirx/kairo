interface TimerModeSelectorProps {
  mode: "pomodoro" | "flowclock";
  onModeChange: (mode: "pomodoro" | "flowclock") => void;
}

export default function TimerModeSelector({ mode, onModeChange }: TimerModeSelectorProps) {
  return (
    <div className="flex justify-center gap-2 md:gap-4 mb-8 md:mb-12">
      <button
        onClick={() => onModeChange("pomodoro")}
        className={`px-4 md:px-8 py-3 text-sm md:text-white transition-all min-h-[44px] rounded ${
          mode === "pomodoro"
            ? "border-2 border-white text-white"
            : "text-white/60 hover:text-white/80 border-2 border-transparent"
        }`}
      >
        Pomodoro
      </button>
      <button
        onClick={() => onModeChange("flowclock")}
        className={`px-4 md:px-8 py-3 text-sm md:text-white transition-all min-h-[44px] rounded ${
          mode === "flowclock"
            ? "border-2 border-white text-white"
            : "text-white/60 hover:text-white/80 border-2 border-transparent"
        }`}
      >
        Flow clock
      </button>
    </div>
  );
}
