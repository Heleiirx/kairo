import { useState, useEffect, useRef } from "react";
import TimerDisplay from "./TimerDisplay";
import TimerControls from "./TimerControls";
import { usePictureInPicture } from "../../hooks/usePictureInPicture";

interface PomodoroTimerProps {
  mode: "pomodoro" | "flowclock";
}

type SessionType = "focus" | "short-break" | "long-break";

const SESSION_DURATIONS = {
  focus: 25 * 60,
  "short-break": 5 * 60,
  "long-break": 15 * 60,
};

export default function PomodoroTimer({ mode }: PomodoroTimerProps) {
  const [currentSession, setCurrentSession] = useState<SessionType>("focus");
  const [timeLeft, setTimeLeft] = useState(SESSION_DURATIONS.focus);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (mode === "flowclock") {
      setTimeLeft(0);
      setCurrentSession("focus");
      setIsRunning(false);
    } else {
      setTimeLeft(SESSION_DURATIONS[currentSession]);
      setIsRunning(false);
    }
  }, [mode]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (mode === "flowclock") {
            return prev + 1;
          }
          
          if (prev <= 1) {
            handleSessionComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, mode]);

  const handleSessionComplete = () => {
    setIsRunning(false);
    
    if (currentSession === "focus") {
      const newCompletedSessions = completedSessions + 1;
      setCompletedSessions(newCompletedSessions);
      
      if (newCompletedSessions % 4 === 0) {
        setCurrentSession("long-break");
        setTimeLeft(SESSION_DURATIONS["long-break"]);
      } else {
        setCurrentSession("short-break");
        setTimeLeft(SESSION_DURATIONS["short-break"]);
      }
    } else {
      setCurrentSession("focus");
      setTimeLeft(SESSION_DURATIONS.focus);
    }
  };

  const handlePlayPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    if (mode === "flowclock") {
      setTimeLeft(0);
    } else {
      setTimeLeft(SESSION_DURATIONS[currentSession]);
    }
  };

  const handleStop = () => {
    setIsRunning(false);
    setTimeLeft(mode === "flowclock" ? 0 : SESSION_DURATIONS.focus);
    setCurrentSession("focus");
    setCompletedSessions(0);
  };

  const getSessionLabel = () => {
    if (mode === "flowclock") return "Focus";
    
    switch (currentSession) {
      case "focus":
        return "Focus";
      case "short-break":
        return "Short Break";
      case "long-break":
        return "Long Break";
    }
  };

  const { isPiPActive, togglePiP, isPiPSupported } = usePictureInPicture({
    timeLeft,
    sessionLabel: getSessionLabel(),
    isRunning,
    mode,
    onPlayPause: handlePlayPause,
    onReset: handleReset,
    onStop: handleStop
  });

  return (
    <div className="flex flex-col items-center">
      <TimerDisplay 
        timeLeft={timeLeft} 
        sessionLabel={getSessionLabel()}
        mode={mode}
        completedSessions={completedSessions}
        currentSession={currentSession}
      />
      <TimerControls 
        isRunning={isRunning}
        onPlayPause={handlePlayPause}
        onReset={handleReset}
        onStop={handleStop}
        onTogglePiP={togglePiP}
        isPiPActive={isPiPActive}
        isPiPSupported={isPiPSupported}
      />
    </div>
  );
}
