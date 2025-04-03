// components/ui/CustomToaster.tsx
"use client";

import { Toaster } from "react-hot-toast";

export default function CustomToaster() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          background: "#1f2937", // bg-gray-800
          color: "#f9fafb",      // text-gray-50
          border: "1px solid #374151",
          padding: "12px 16px",
          fontSize: "14px",
          borderRadius: "8px",
        },
        success: {
          iconTheme: {
            primary: "#10b981", // verde
            secondary: "#d1fae5",
          },
        },
        error: {
          iconTheme: {
            primary: "#ef4444", // rojo
            secondary: "#fee2e2",
          },
        },
      }}
    />
  );
}
