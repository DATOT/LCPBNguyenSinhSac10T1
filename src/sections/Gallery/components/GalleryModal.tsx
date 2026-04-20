import { motion } from "framer-motion";

type GalleryItem = {
  id: number;
  title: string;
  description: string;
  image: string;
};

export default function GalleryModal({
  item,
  onClose,
}: {
  item: GalleryItem;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{
        background: "rgba(0,0,0,0.4)",
        backdropFilter: "blur(8px)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        layoutId={`card-${item.id}`}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl rounded-2xl overflow-hidden flex flex-col md:flex-row"
        style={{
          background: "rgb(var(--color-surface-elevated))",
          border: "1px solid rgb(var(--color-border))",
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
        }}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition"
          style={{
            background: "rgba(var(--color-surface), 0.8)",
            border: "1px solid rgb(var(--color-border))",
          }}
        >
          ✕
        </button>

        {/* IMAGE */}
        <div className="md:w-1/2 bg-[rgb(var(--color-surface))] flex items-center justify-center">
          <img
            src={item.image}
            className="max-h-[70vh] w-full object-contain"
          />
        </div>

        {/* CONTENT */}
        <div className="p-6 md:w-1/2 flex flex-col justify-center">
          <h2
            className="text-2xl font-semibold mb-3 leading-tight"
            style={{ color: "rgb(var(--color-text))" }}
          >
            {item.title}
          </h2>

          <p
            className="text-sm leading-relaxed"
            style={{ color: "rgb(var(--color-text-muted))" }}
          >
            {item.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}