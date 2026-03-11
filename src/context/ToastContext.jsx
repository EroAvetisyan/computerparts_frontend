import React, { createContext, useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            className="fixed top-6 right-6 bg-accent-purple text-white px-6 py-3 rounded-xl shadow-lg z- 100"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
