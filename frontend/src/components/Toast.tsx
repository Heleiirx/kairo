import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { type Toast as ToastType } from '../types/toast';
import { useToastStore } from '../store/toastStore';

interface ToastProps {
  toast: ToastType;
}

const toastStyles = {
  success: 'bg-success/50 border-success text-white',
  error: 'bg-error/50 border-error text-white',
  warning: 'bg-warning/50 border-warning text-white',
  info: 'bg-base/50 border-primary text-white',
};

const toastIcons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

export const Toast = ({ toast }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const removeToast = useToastStore((state) => state.removeToast);
  const Icon = toastIcons[toast.type];

  useEffect(() => {
    // Trigger animation
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => removeToast(toast.id), 300);
  };

  return (
    <div
      className={`
        flex items-center gap-3 p-4 rounded-lg border-l-4 shadow-lg
        transition-all duration-300 ease-in-out min-w-[300px] max-w-md
        ${toastStyles[toast.type]}
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      <p className="flex-1 text-sm font-medium">{toast.message}</p>
      <button
        onClick={handleClose}
        className="flex-shrink-0 hover:opacity-70 transition-opacity"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
