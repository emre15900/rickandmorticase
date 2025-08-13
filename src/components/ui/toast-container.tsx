"use client";

import { useSimpleToast } from '@/hooks/useSimpleToast';
import { Toast } from '@/components/ui/simple-toast';

export function ToastContainer() {
  const { toasts, removeToast } = useSimpleToast();

  return (
    <>
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={removeToast}
        />
      ))}
    </>
  );
}
