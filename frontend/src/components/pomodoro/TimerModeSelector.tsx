interface TimerModeSelectorProps {
  mode: "pomodoro" | "flowclock";
  onModeChange: (mode: "pomodoro" | "flowclock") => void;
}

export default function TimerModeSelector({ mode, onModeChange }: TimerModeSelectorProps) {
  return (
    <div className="flex justify-center gap-4 mb-12">
      <button
        onClick={() => onModeChange("pomodoro")}
        className={`px-8 py-3 text-base transition-all ${
          mode === "pomodoro"
            ? "border-2 border-white text-white"
            : "text-white/60 hover:text-white/80"
        }`}
      >
        Pomodoro
      </button>
      <button
        onClick={() => onModeChange("flowclock")}
        className={`px-8 py-3 text-base transition-all ${
          mode === "flowclock"
            ? "border-b-2 border-white text-white"
            : "text-white/60 hover:text-white/80"
        }`}
      >
        Flow clock
      </button>
    </div>
  );
}
