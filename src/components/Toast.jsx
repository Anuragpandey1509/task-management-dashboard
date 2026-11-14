import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useTasks } from '../context/TaskContext';

export default function Toast() {
  const { toast, hideToast } = useTasks();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        hideToast();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast, hideToast]);

  if (!toast) return null;

  const typeConfig = {
    success: {
      icon: CheckCircle2,
      border: 'border-emerald-200 dark:border-emerald-800',
      bg: 'bg-white dark:bg-slate-800',
      iconColor: 'text-emerald-500',
    },
    warning: {
      icon: AlertCircle,
      border: 'border-amber-200 dark:border-amber-800',
      bg: 'bg-white dark:bg-slate-800',
      iconColor: 'text-amber-500',
    },
    info: {
      icon: Info,
      border: 'border-blue-200 dark:border-blue-800',
      bg: 'bg-white dark:bg-slate-800',
      iconColor: 'text-blue-500',
    },
  };

  const config = typeConfig[toast.type] || typeConfig.success;
  const Icon = config.icon;

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-fade-in max-w-sm">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl border ${config.border} ${config.bg} text-slate-800 dark:text-slate-100 text-xs sm:text-sm font-medium`}
        role="status"
      >
        <Icon className={`w-5 h-5 flex-shrink-0 ${config.iconColor}`} />
        <span className="flex-1">{toast.message}</span>
        <button
          onClick={hideToast}
          className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
          aria-label="Dismiss toast"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

