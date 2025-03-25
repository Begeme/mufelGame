"use client";
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

export function Button({ children, className = "", ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`px-6 py-3 text-lg font-bold rounded-lg transition duration-300 transform hover:scale-105 ${className}`}
      style={{
        backgroundColor: "#FACC15",
        color: "#000",
        border: "2px solid transparent",
        boxShadow: "0 4px 10px rgba(255, 204, 0, 0.3)",
      }}
    >
      {children}
    </button>
  );
}
