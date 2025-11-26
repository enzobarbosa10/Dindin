import React, { useState, useCallback, useEffect } from 'react';
import { Check, AlertCircle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  addToast: (message: string, type: ToastType) => void;
}

export const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast deve ser usado dentro de ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);

    // Auto-remover após 3 segundos
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-6 left-6 z-[100] space-y-3 max-w-sm">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            id={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

interface ToastComponentProps {
  id: string;
  message: string;
  type: ToastType;
  onClose: () => void;
}

const Toast: React.FC<ToastComponentProps> = ({ id, message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const styles = {
    success: {
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      text: 'text-emerald-200',
      icon: 'text-emerald-500',
    },
    error: {
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      text: 'text-red-200',
      icon: 'text-red-500',
    },
    info: {
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      text: 'text-blue-200',
      icon: 'text-blue-500',
    },
  };

  const style = styles[type];

  const Icon = type === 'success' ? Check : type === 'error' ? AlertCircle : AlertCircle;

  return (
    <div
      className={`${style.bg} ${style.border} border rounded-lg p-4 flex items-start gap-3 animate-in slide-in-from-left duration-300`}
      role="alert"
    >
      <Icon className={`${style.icon} w-5 h-5 flex-shrink-0 mt-0.5`} />
      <p className={`${style.text} text-sm flex-1`}>{message}</p>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
        aria-label="Fechar notificação"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
