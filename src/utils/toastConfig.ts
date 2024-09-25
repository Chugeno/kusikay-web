import { ToastOptions } from 'react-toastify';

export const toastConfig: ToastOptions = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
  style: {
    backgroundColor: "#853C29", // kusikay-accent
    color: "#F1D9D2", // kusikay-bg
    fontFamily: "Roboto, sans-serif", // Usa la fuente de tu sitio
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
  }
};