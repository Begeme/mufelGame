import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { motion, AnimatePresence } from "framer-motion";

interface NewsItem {
  id: number;
  title: string;
  description: string;
  content: string;
  image: string;
  category: string;
  created_at: string;
}

interface Props {
  news: NewsItem;
  onClose: () => void;
}

export default function NewsModal({ news, onClose }: Props) {
  const isFuture = new Date(news.created_at) > new Date();

  const handleBackdropClick = () => onClose();

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur flex items-center justify-center p-4"
        onClick={handleBackdropClick} // Cierra al hacer clic fuera
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative bg-gray-900 rounded-xl max-w-3xl w-full overflow-hidden shadow-xl"
          onClick={handleModalClick} // No cerrar al hacer clic dentro
        >
          {/* Botón cerrar */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 text-white text-xl hover:text-yellow-500 transition-colors"
            title="Cerrar"
          >
            ✕
          </button>

          {/* Imagen superior */}
          {news.image && (
            <div className="relative w-full h-64">
              <Image
                src={news.image}
                alt={news.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Contenido */}
          <div className="p-6 space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              {news.title}
              {isFuture && news.category === "Torneos" && (
                <span className="text-xs bg-yellow-500 text-black px-2 py-1 rounded">
                  🕑 Próximo Evento
                </span>
              )}
            </h2>
            <span className="text-sm text-yellow-500">
              {news.category} • {new Date(news.created_at).toLocaleDateString()}
            </span>
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              >
                {news.content}
              </ReactMarkdown>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
