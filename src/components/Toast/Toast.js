import React from "react";
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
} from "react-feather";

import VisuallyHidden from "../VisuallyHidden";

import styles from "./Toast.module.css";

const ICONS_BY_VARIANT = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

const stylesMap = {
  notice: styles.notice,
  warning: styles.warning,
  success: styles.success,
  error: styles.error,
};

function Toast({ id, variant, onRequestDismiss, children }) {
  const Icon = ICONS_BY_VARIANT[variant];
  const variantStyle = stylesMap[variant];
  return (
    <div className={`${styles.toast} ${variantStyle}`}>
      <div className={styles.iconContainer}>
        <Icon size={24} />
      </div>
      <p className={styles.content}>{children}</p>
      <button
        className={styles.closeButton}
        onClick={() => onRequestDismiss(id)}
      >
        <X size={24} />
        <VisuallyHidden>Dismiss message</VisuallyHidden>
      </button>
    </div>
  );
}

const ToastContext = React.createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const addToast = React.useCallback((message, variant) => {
    setToasts((prevToasts) => {
      const newToasts = [
        ...prevToasts,
        {
          id: window.crypto.randomUUID(),
          message,
          variant,
        },
      ];

      return newToasts;
    });
  }, []);

  const removeToast = React.useCallback((toastId) => {
    setToasts((prevToasts) => {
      const newToast = prevToasts.filter(
        (prevToast) => prevToast.id !== toastId
      );

      return newToast;
    });
  }, []);

  return (
    <ToastContext.Provider
      value={{
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);

  if (!context) {
    throw new Error("`useToast` must be used withing `<ToastProvider />`");
  }

  return context;
}

export default Toast;
