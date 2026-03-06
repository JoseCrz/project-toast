import React, { useEffect, useState } from "react";

import Button from "../Button";

import styles from "./ToastPlayground.module.css";
import ToastShelf from "../ToastShelf";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const [message, setMessage] = useState("");
  const [selectedVariantOption, setSelectedVariantOption] = useState(
    VARIANT_OPTIONS[0]
  );

  const [toasts, setToasts] = useState([]);

  const addToast = React.useCallback(() => {
    if (!message) return;

    setToasts((prevToasts) => {
      const newToasts = [
        ...prevToasts,
        {
          id: window.crypto.randomUUID(),
          message,
          variant: selectedVariantOption,
        },
      ];

      return newToasts;
    });

    setMessage("");
  }, [message, selectedVariantOption]);

  useEffect(() => {
    function handleKeyPress(event) {
      if (event.key === "Enter") addToast();
    }

    window.addEventListener("keypress", handleKeyPress);

    return () => window.removeEventListener("keypress", handleKeyPress);
  }, [addToast]);

  function resetPlayground() {
    setMessage("");
    setSelectedVariantOption(VARIANT_OPTIONS[0]);
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>
      <ToastShelf
        toasts={toasts}
        onRequestToastDismiss={(toastId) => {
          setToasts((prevToasts) => {
            const newToast = prevToasts.filter(
              (prevToast) => prevToast.id !== toastId
            );

            return newToast;
          });
        }}
      />
      <div className={styles.controlsWrapper}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: "baseline" }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              className={styles.messageInput}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((option, index) => (
              <label key={option + index}>
                <input
                  type="radio"
                  name="variant"
                  value={option}
                  checked={option === selectedVariantOption}
                  onChange={(event) => {
                    setSelectedVariantOption(event.target.value);
                  }}
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button onClick={resetPlayground}>Pop Toast!</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToastPlayground;
