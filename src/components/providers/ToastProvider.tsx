"use client";

import { createContext, useContext, ReactNode, useState, useCallback } from 'react';
import { Toast } from '@/components/ui/simple-toast';

interface ToastData {
  id: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'success' | 'error';
  duration?: number;
}

interface ToastContextType {
  toast: {
    success: (title: string, description?: string) => void;
    error: (title: string, description?: string) => void;
    default: (title: string, description?: string) => void;
  };
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

let toastId = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = useCallback(({ title, description, variant = 'default', duration = 5000 }: Omit<ToastData, 'id'>) => {
    const id = `toast-${++toastId}`;
    setToasts(prev => [...prev, { id, title, description, variant, duration }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const toast = {
    success: useCallback((title: string, description?: string) => addToast({ title, description, variant: 'success' }), [addToast]),
    error: useCallback((title: string, description?: string) => addToast({ title, description, variant: 'error' }), [addToast]),
    default: useCallback((title: string, description?: string) => addToast({ title, description, variant: 'default' }), [addToast]),
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {toasts.map(toastData => (
        <Toast
          key={toastData.id}
          {...toastData}
          onClose={removeToast}
        />
      ))}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
