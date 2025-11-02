import { useState } from "react";

export function useToast() {
  const [message, setMessage] = useState(null);
  const [type, setType] = useState("info");

  const toast = (msg, variant = "info") => {
    setMessage(msg);
    setType(variant);
    setTimeout(() => setMessage(null), 3000);
  };

  const ToastContainer = () =>
    message ? <div className={`toast ${type}`}>{message}</div> : null;

  return { toast, ToastContainer };
}
