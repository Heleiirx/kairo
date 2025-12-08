import { useState } from "react";
import PomodoroTimer from "../components/pomodoro/PomodoroTimer";
import TimerModeSelector from "../components/pomodoro/TimerModeSelector";

function Pomodoro() {
  const [timerMode, setTimerMode] = useState<"pomodoro" | "flowclock">("pomodoro");

  return (
    <div className="flex flex-col items-center justify-center min-h-full py-4 md:py-8 px-4 md:px-6">
      <div className="w-full max-w-4xl">
        <TimerModeSelector 
          mode={timerMode} 
          onModeChange={setTimerMode} 
        />
        <PomodoroTimer mode={timerMode} />
      </div>
    </div>
  );
}

export default Pomodoro;
