"use client";

interface BadgeLimitadaProps {
  visible: boolean;
}

export default function BadgeLimitada({ visible }: BadgeLimitadaProps) {
  if (!visible) return null;

  return (
    <div className="inline-block px-3 py-1 mb-2 rounded-full text-xs font-bold bg-yellow-400 text-black animate-pulse shadow-md">
      🎖 Edición Limitada
    </div>
  );
}