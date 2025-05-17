interface Props {
  active: string;
  onChange: (category: string) => void;
}

const categorias = ["Todos", "Eventos", "Actualización", "Modos", "Torneos"];

export default function NewsFilter({ active, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {categorias.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-4 py-2 rounded-full border text-sm font-medium transition
            ${
              active === cat
                ? "bg-yellow-500 text-black border-yellow-500"
                : "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
            }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
