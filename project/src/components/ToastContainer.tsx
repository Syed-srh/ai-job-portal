import { useToast } from '../context/ToastContext';
import { CheckCircle2, Info, XCircle, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, dismissToast } = useToast();

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => {
        const Icon = toast.type === 'success' ? CheckCircle2 : toast.type === 'error' ? XCircle : Info;
        const color =
          toast.type === 'success'
            ? 'text-success-500'
            : toast.type === 'error'
            ? 'text-error-500'
            : 'text-brand-500';

        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl bg-white dark:bg-slate-800 shadow-card-hover border border-slate-200 dark:border-slate-700 animate-slide-in-right max-w-sm"
          >
            <Icon className={`w-5 h-5 shrink-0 ${color}`} />
            <p className="text-sm font-medium text-slate-700 dark:text-slate-200 flex-1">
              {toast.message}
            </p>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
