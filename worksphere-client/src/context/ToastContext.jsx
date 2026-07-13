import { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (type, message, duration = 4000) => {
      const id = crypto.randomUUID();
      setToasts((prev) => [...prev, { id, type, message }]);

      if (duration) {
        setTimeout(() => removeToast(id), duration);
      }
    },
    [removeToast],
  );

  const showSuccess = (message, duration) =>
    addToast("success", message, duration);
  const showError = (message, duration) => addToast("error", message, duration);
  const showWarning = (message, duration) =>
    addToast("warning", message, duration);

  return (
    <ToastContext.Provider
      value={{ toasts, showSuccess, showError, showWarning, removeToast }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
