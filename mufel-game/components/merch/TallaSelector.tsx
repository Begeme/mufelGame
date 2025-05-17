"use client";

interface TallaSelectorProps {
  tallas: string[];
  tallaSeleccionada: string;
  onSelect: (t: string) => void;
}

export default function TallaSelector({ tallas, tallaSeleccionada, onSelect }: TallaSelectorProps) {
  return (
    <div className="mb-4">
      <p className="font-semibold mb-2">Talla:</p>
      <div className="flex gap-3 flex-wrap">
        {tallas.map((t) => (
          <button
            key={t}
            onClick={() => onSelect(t)}
            className={`w-10 h-10 flex items-center justify-center rounded-full border-2 text-sm font-semibold transition cursor-pointer ${
              tallaSeleccionada === t
                ? "bg-white text-black border-white"
                : "text-white border-gray-600 hover:border-white"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}