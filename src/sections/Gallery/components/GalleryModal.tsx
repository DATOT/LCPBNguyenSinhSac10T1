import { motion, AnimatePresence } from "framer-motion";
import { GalleryItem } from "../types";

export default function GalleryModal({
  item,
  onClose,
}: {
  item: GalleryItem;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        className="
          fixed inset-0 flex items-center justify-center z-50
          backdrop-blur-sm
        "
        style={{ background: "rgba(0, 0, 0, 0.8)" }}
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          key="modal"
          className="
            w-full max-w-lg
            rounded-[var(--radius-lg)]
            p-4
            shadow-xl
            border
            bg-[rgb(var(--color-surface-elevated))]
            border-[rgb(var(--color-border))]
          "
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{
            duration: 0.25,
            ease: "easeOut",
          }}
        >
          <img
            src={item.image}
            className="
              rounded-[var(--radius-md)]
              mb-3
              w-full
              object-cover
            "
          />

          <h2 className="text-lg font-semibold text-[rgb(var(--color-text))]">
            {item.title}
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--color-text-muted))]">
            {item.description}
          </p>

          <p className="text-xs mt-4 text-[rgb(var(--color-text-muted)/0.8)]">
            {item.author} • {new Date(item.date).toLocaleString()}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}