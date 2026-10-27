import React, { useEffect } from 'react';
import { CheckCircle2, Info, X } from 'lucide-react';

export interface ToastData {
  id: string;
  title: string;
  message: string;
  type?: 'success' | 'info';
}

interface ToastNoticeProps {
  toasts: ToastData[];
  onDismiss: (id: string) => void;
}

export const ToastNotice: React.FC<ToastNoticeProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastData; onDismiss: (id: string) => void }> = ({
  toast,
  onDismiss,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  return (
    <div className="pointer-events-auto bg-neutral-900 text-white rounded-2xl p-4 shadow-2xl border border-neutral-800 flex items-start gap-3 animate-in slide-in-from-bottom-3 duration-200">
      {toast.type === 'info' ? (
        <Info className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
      ) : (
        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
      )}
      <div className="flex-1 text-xs">
        <h4 className="font-bold text-white">{toast.title}</h4>
        <p className="text-neutral-300 mt-0.5 leading-relaxed">{toast.message}</p>
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="text-neutral-500 hover:text-white p-0.5 transition-colors cursor-pointer"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
