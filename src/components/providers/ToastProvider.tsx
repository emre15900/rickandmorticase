"use client";

import { createContext, useContext, ReactNode } from 'react';
import { useSimpleToast } from '@/hooks/useSimpleToast';
import { Toast } from '@/components/ui/simple-toast';

interface ToastContextType {
  toast: {
    success: (title: string, description?: string) => void;
    error: (title: string, description?: string) => void;
    default: (title: string, description?: string) => void;
  };
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const { toasts, toast, removeToast } = useSimpleToast();

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
