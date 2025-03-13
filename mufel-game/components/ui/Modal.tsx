"use client";
import { FiX } from "react-icons/fi";

export default function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96 relative">
        <button className="absolute top-2 right-2 text-white" onClick={onClose}>
          <FiX size={24} />
        </button>
        {children}
      </div>
    </div>
  );
}
