"use client";

export function Button({ children, onClick, className }: { children: React.ReactNode; onClick?: () => void; className?: string }) {
  return (
    <button
      onClick={onClick}
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