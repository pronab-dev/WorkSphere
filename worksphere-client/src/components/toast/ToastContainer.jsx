import { useEffect, useState } from "react";
import { CheckCircle, XCircle, AlertTriangle, X } from "lucide-react";
import { useToast } from "../../context/ToastContext";

const styles = {
  success: {
    bg: "bg-emerald-50 border-emerald-200",
    text: "text-emerald-800",
    icon: CheckCircle,
    iconColor: "text-emerald-500",
  },
  error: {
    bg: "bg-red-50 border-red-200",
    text: "text-red-800",
    icon: XCircle,
    iconColor: "text-red-500",
  },
  warning: {
    bg: "bg-amber-50 border-amber-200",
    text: "text-amber-800",
    icon: AlertTriangle,
    iconColor: "text-amber-500",
  },
};

function ToastCard({ toast, onClose }) {
  const [visible, setVisible] = useState(false);
  const style = styles[toast.type] || styles.success;
  const Icon = style.icon;

  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 200); // let the exit animation finish before unmount
  };

  return (
    <div
      className={`pointer-events-auto flex items-start gap-4 rounded-2xl border ${style.bg} ${style.text} px-6 py-5 shadow-xl shadow-slate-300/40 w-full max-w-md min-h-[80px] transition-all duration-200 ease-out ${
        visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
    >
      <Icon size={26} className={`shrink-0 mt-0.5 ${style.iconColor}`} />
      <p className="flex-1 text-base font-medium leading-snug">
        {toast.message}
      </p>
      <button
        onClick={handleClose}
        className="shrink-0 text-slate-400 hover:text-slate-600"
        aria-label="Dismiss"
      >
        <X size={20} />
      </button>
    </div>
  );
}

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <>
      {/* Dim the background slightly so the centered toast draws focus */}
      <div className="fixed inset-0 z-[99] bg-slate-900/10 backdrop-blur-[1px] pointer-events-none" />

      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-3 pointer-events-none px-4">
        {toasts.map((toast) => (
          <ToastCard
            key={toast.id}
            toast={toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </>
  );
}
