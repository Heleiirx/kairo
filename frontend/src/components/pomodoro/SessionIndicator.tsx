interface SessionIndicatorProps {
  completedSessions: number;
  currentSession: "focus" | "short-break" | "long-break";
}

export default function SessionIndicator({ 
  completedSessions
}: SessionIndicatorProps) {
  const dots = Array.from({ length: 4 }, (_, i) => i);

  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-3">
      {dots.map((index) => (
        <div
          key={index}
          className={`h-3 w-3 md:h-4 md:w-4 rounded-full transition-colors ${
            index < completedSessions % 4
              ? "bg-white"
              : "bg-white/20"
          }`}
        />
      ))}
    </div>
  );
}
