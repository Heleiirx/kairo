interface SessionIndicatorProps {
  completedSessions: number;
  currentSession: "focus" | "short-break" | "long-break";
}

export default function SessionIndicator({ 
  completedSessions
}: SessionIndicatorProps) {
  const dots = Array.from({ length: 4 }, (_, i) => i);

  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-3 mt-2">
      {dots.map((index) => (
        <div
          key={index}
          className={`h-2 w-2 rounded-full transition-colors ${
            index < completedSessions % 4
              ? "bg-white"
              : "bg-white/20"
          }`}
        />
      ))}
    </div>
  );
}
