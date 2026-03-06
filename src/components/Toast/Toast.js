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

function Toast({ content, variant, open, onRequestDismiss }) {
  if (!open) return null;

  const Icon = ICONS_BY_VARIANT[variant];
  const variantStyle = stylesMap[variant];
  return (
    <div className={`${styles.toast} ${variantStyle}`}>
      <div className={styles.iconContainer}>
        <Icon size={24} />
      </div>
      <p className={styles.content}>{content}</p>
      <button className={styles.closeButton} onClick={onRequestDismiss}>
        <X size={24} />
        <VisuallyHidden>Dismiss message</VisuallyHidden>
      </button>
    </div>
  );
}

export default Toast;
