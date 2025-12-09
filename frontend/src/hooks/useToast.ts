import { useToastStore } from '../store/toastStore';
import { type ToastType } from '../types/toast';

export const useToast = () => {
  const addToast = useToastStore((state) => state.addToast);

  const toast = {
    success: (message: string, duration?: number) => {
      addToast({ message, type: 'success', duration });
    },
    error: (message: string, duration?: number) => {
      addToast({ message, type: 'error', duration });
    },
    warning: (message: string, duration?: number) => {
      addToast({ message, type: 'warning', duration });
    },
    info: (message: string, duration?: number) => {
      addToast({ message, type: 'info', duration });
    },
    custom: (message: string, type: ToastType, duration?: number) => {
      addToast({ message, type, duration });
    },
  };

  return toast;
};
