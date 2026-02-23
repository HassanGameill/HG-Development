'use client'

import { Toaster, ToastBar } from "react-hot-toast";

export const ToasterProvider = () => {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 4500,
        style: {
          background: '#F5FBE6', // dark gray background
          color: '#f5f5f5',       // light text
          padding: '14px 20px',
          borderRadius: '12px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.25)',
          fontWeight: 500,
          fontSize: '15px',
        },
        success: {
          duration: 3500,
          style: { background: '#F5FBE6', color: '#233D4D' }, // green toast
        },
        error: {
          duration: 3500,
          style: { background: '#ef4444', color: '#fff' }, // red toast
        },
      }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <div className="flex items-center gap-3">
              {icon}
              <span>{message}</span>
            </div>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
};
