import React from "react";

import Toast, { useToast } from "../Toast";
import styles from "./ToastShelf.module.css";

function ToastShelf() {
  const { toasts, removeToast } = useToast();
  return (
    <ol className={styles.wrapper}>
      {toasts.map((toast) => (
        <li key={toast.id} className={styles.toastWrapper}>
          <Toast
            id={toast.id}
            variant={toast.variant}
            onRequestDismiss={() => removeToast(toast.id)}
          >
            {toast.message}
          </Toast>
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
