import { useState, useEffect, useCallback, useRef } from 'react';

interface UsePictureInPictureProps {
  timeLeft: number;
  sessionLabel: string;
  isRunning: boolean;
  mode: "pomodoro" | "flowclock";
  onPlayPause: () => void;
  onReset: () => void;
  onStop: () => void;
}

export function usePictureInPicture({
  timeLeft,
  sessionLabel,
  isRunning,
  mode,
  onPlayPause,
  onReset,
  onStop
}: UsePictureInPictureProps) {
  const [isPiPActive, setIsPiPActive] = useState(false);
  const [pipSize, setPipSize] = useState({ width: 400, height: 400 });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pipWindowRef = useRef<Window | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  
  // Store callbacks in refs to avoid dependency issues
  const onPlayPauseRef = useRef(onPlayPause);
  const onResetRef = useRef(onReset);
  const onStopRef = useRef(onStop);
  
  // Update refs when callbacks change
  useEffect(() => {
    onPlayPauseRef.current = onPlayPause;
    onResetRef.current = onReset;
    onStopRef.current = onStop;
  }, [onPlayPause, onReset, onStop]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const drawTimer = useCallback((canvas: HTMLCanvasElement, width: number, height: number) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = width / 2;
    const centerY = height / 2;
    const isSmall = width < 250 || height < 250;
    const showCircle = width >= 200 && height >= 200;
    
    // Calculate sizes based on window dimensions
    const radius = Math.min(width, height) * 0.28;
    const fontSize = Math.max(24, Math.min(48, width * 0.12));
    const labelFontSize = Math.max(12, Math.min(16, width * 0.04));
    const controlSize = Math.max(32, Math.min(48, width * 0.1));
    const controlY = height - controlSize - 20;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Background
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#1e293b');
    gradient.addColorStop(1, '#0f172a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Calculate timer position (higher if showing controls)
    const timerY = isSmall ? centerY - 20 : centerY - 30;

    // Draw circle only if window is large enough
    if (showCircle) {
      // Draw outer circle
      ctx.beginPath();
      ctx.arc(centerX, timerY, radius, 0, 2 * Math.PI);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw progress arc for pomodoro mode
      if (mode === "pomodoro") {
        const progress = timeLeft / (25 * 60);
        const startAngle = -Math.PI / 2;
        const endAngle = startAngle + (2 * Math.PI * progress);

        ctx.beginPath();
        ctx.arc(centerX, timerY, radius, startAngle, endAngle);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Draw dot at progress position
        const dotX = centerX + radius * Math.cos(endAngle);
        const dotY = timerY + radius * Math.sin(endAngle);
        ctx.beginPath();
        ctx.arc(dotX, dotY, 5, 0, 2 * Math.PI);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      }
    }

    // Draw time text
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${fontSize}px system-ui, -apple-system, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(formatTime(timeLeft), centerX, timerY);

    // Draw session label
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.font = `${labelFontSize}px system-ui, -apple-system, sans-serif`;
    ctx.fillText(sessionLabel, centerX, timerY + fontSize / 2 + 10);

    // Draw status indicator
    if (isRunning) {
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(centerX, timerY + fontSize / 2 + 30, 4, 0, 2 * Math.PI);
      ctx.fill();
    }

    // Draw control buttons
    const buttonSpacing = controlSize + 15;
    const startX = centerX - buttonSpacing;

    // Play/Pause button
    drawButton(ctx, startX, controlY, controlSize, isRunning ? 'pause' : 'play');
    
    // Reset button
    drawButton(ctx, centerX, controlY, controlSize, 'reset');
    
    // Stop button
    drawButton(ctx, startX + buttonSpacing * 2, controlY, controlSize, 'stop');

  }, [timeLeft, sessionLabel, isRunning, mode]);

  const drawButton = (
    ctx: CanvasRenderingContext2D, 
    x: number, 
    y: number, 
    size: number, 
    type: 'play' | 'pause' | 'reset' | 'stop'
  ) => {
    const radius = size / 2;
    const iconSize = size * 0.4;

    // Button background
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fill();

    // Button icon
    ctx.strokeStyle = '#ffffff';
    ctx.fillStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    switch (type) {
      case 'play':
        // Play triangle
        ctx.beginPath();
        ctx.moveTo(x - iconSize / 3, y - iconSize / 2);
        ctx.lineTo(x - iconSize / 3, y + iconSize / 2);
        ctx.lineTo(x + iconSize / 2, y);
        ctx.closePath();
        ctx.fill();
        break;
      
      case 'pause':
        // Pause bars
        ctx.fillRect(x - iconSize / 3, y - iconSize / 2, iconSize / 4, iconSize);
        ctx.fillRect(x + iconSize / 12, y - iconSize / 2, iconSize / 4, iconSize);
        break;
      
      case 'reset':
        // Reset circular arrow
        ctx.beginPath();
        ctx.arc(x, y, iconSize / 2, -Math.PI / 4, Math.PI * 1.5, false);
        ctx.stroke();
        // Arrow head
        ctx.beginPath();
        ctx.moveTo(x - iconSize / 2, y - iconSize / 4);
        ctx.lineTo(x - iconSize / 2, y + iconSize / 6);
        ctx.lineTo(x - iconSize / 4, y);
        ctx.stroke();
        break;
      
      case 'stop':
        // Stop X
        ctx.beginPath();
        ctx.moveTo(x - iconSize / 3, y - iconSize / 3);
        ctx.lineTo(x + iconSize / 3, y + iconSize / 3);
        ctx.moveTo(x + iconSize / 3, y - iconSize / 3);
        ctx.lineTo(x - iconSize / 3, y + iconSize / 3);
        ctx.stroke();
        break;
    }
  };

  const updateCanvas = useCallback(() => {
    if (canvasRef.current && isPiPActive) {
      drawTimer(canvasRef.current, pipSize.width, pipSize.height);
      animationFrameRef.current = requestAnimationFrame(updateCanvas);
    }
  }, [drawTimer, isPiPActive, pipSize]);

  useEffect(() => {
    if (isPiPActive) {
      updateCanvas();
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPiPActive, updateCanvas]);

  const handleCanvasClick = useCallback((event: MouseEvent) => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Scale coordinates to canvas size
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const canvasX = x * scaleX;
    const canvasY = y * scaleY;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const controlSize = Math.max(32, Math.min(48, width * 0.1));
    const controlY = height - controlSize - 20;
    const buttonSpacing = controlSize + 15;
    const startX = centerX - buttonSpacing;
    const radius = controlSize / 2;

    // Check if click is on any button
    const buttons = [
      { x: startX, y: controlY, action: () => onPlayPauseRef.current() },
      { x: centerX, y: controlY, action: () => onResetRef.current() },
      { x: startX + buttonSpacing * 2, y: controlY, action: () => onStopRef.current() }
    ];

    for (const button of buttons) {
      const distance = Math.sqrt(
        Math.pow(canvasX - button.x, 2) + Math.pow(canvasY - button.y, 2)
      );
      if (distance <= radius) {
        button.action();
        break;
      }
    }
  }, []);

  const exitPiP = useCallback(() => {
    if (canvasRef.current) {
      canvasRef.current.removeEventListener('click', handleCanvasClick);
    }
    if (resizeObserverRef.current) {
      resizeObserverRef.current.disconnect();
      resizeObserverRef.current = null;
    }
    if (pipWindowRef.current) {
      pipWindowRef.current.close();
      pipWindowRef.current = null;
    }
    canvasRef.current = null;
    setIsPiPActive(false);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  }, [handleCanvasClick]);

  const enterPiP = useCallback(async () => {
    try {
      // Check if Document Picture-in-Picture API is supported
      if (!('documentPictureInPicture' in window)) {
        alert('Picture-in-Picture is not supported in your browser. Try Chrome 116+ or Edge 116+.');
        return;
      }

      const pipWindow = await (window as any).documentPictureInPicture.requestWindow({
        width: 400,
        height: 450,
      });

      pipWindowRef.current = pipWindow;

      // Create canvas in PiP window
      const canvas = pipWindow.document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 450;
      canvas.style.display = 'block';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.cursor = 'pointer';
      
      pipWindow.document.body.style.margin = '0';
      pipWindow.document.body.style.padding = '0';
      pipWindow.document.body.style.overflow = 'hidden';
      pipWindow.document.body.appendChild(canvas);

      canvasRef.current = canvas;
      setPipSize({ width: 400, height: 450 });
      setIsPiPActive(true);

      // Add click handler
      canvas.addEventListener('click', handleCanvasClick);

      // Set up ResizeObserver to handle window resizing
      resizeObserverRef.current = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          if (canvas) {
            canvas.width = width;
            canvas.height = height;
            setPipSize({ width, height });
          }
        }
      });
      resizeObserverRef.current.observe(pipWindow.document.body);

      // Handle PiP window close
      pipWindow.addEventListener('pagehide', () => {
        exitPiP();
      });

    } catch (error) {
      console.error('Failed to enter Picture-in-Picture:', error);
      alert('Failed to open Picture-in-Picture window.');
    }
  }, [handleCanvasClick, exitPiP]);

  const togglePiP = useCallback(() => {
    if (isPiPActive) {
      exitPiP();
    } else {
      enterPiP();
    }
  }, [isPiPActive, enterPiP, exitPiP]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
      if (pipWindowRef.current) {
        pipWindowRef.current.close();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return {
    isPiPActive,
    togglePiP,
    isPiPSupported: 'documentPictureInPicture' in window
  };
}
