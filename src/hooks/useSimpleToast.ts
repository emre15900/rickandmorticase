"use client";

import { useState } from 'react';

interface ToastData {
  id: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'success' | 'error';
  duration?: number;
}

let toastId = 0;

export function useSimpleToast() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = ({ title, description, variant = 'default', duration = 5000 }: Omit<ToastData, 'id'>) => {
    const id = `toast-${++toastId}`;
    setToasts(prev => [...prev, { id, title, description, variant, duration }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const toast = {
    success: (title: string, description?: string) => addToast({ title, description, variant: 'success' }),
    error: (title: string, description?: string) => addToast({ title, description, variant: 'error' }),
    default: (title: string, description?: string) => addToast({ title, description, variant: 'default' }),
  };

  return {
    toasts,
    toast,
    removeToast,
  };
}
