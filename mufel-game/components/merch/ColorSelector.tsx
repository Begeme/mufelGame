"use client";

import type { Variante } from "@/data/productos";

interface ColorSelectorProps {
  variantes: Variante[];
  colorSeleccionado: Variante;
  onSelect: (v: Variante) => void;
  colorToHex: (c: string) => string;
}

export default function ColorSelector({ variantes, colorSeleccionado, onSelect, colorToHex }: ColorSelectorProps) {
  return (
    <div className="mb-4">
      <p className="font-semibold mb-2">Color:</p>
      <div className="flex gap-3 flex-wrap">
        {variantes.map((variante, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(variante)}
            className={`w-10 h-10 rounded-full border-2 transition cursor-pointer ${
              colorSeleccionado.color === variante.color
                ? "border-yellow-400"
                : "border-gray-700 hover:border-yellow-300"
            }`}
            style={{ backgroundColor: colorToHex(variante.color) }}
          />
        ))}
      </div>
    </div>
  );
}