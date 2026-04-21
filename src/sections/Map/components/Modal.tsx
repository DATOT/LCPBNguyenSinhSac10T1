import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import type { Info } from "../types";

interface ModalProps {
  data: Info;
  onClose: () => void;
}

export default function Modal({ data, onClose }: ModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {/* Blur + radial backdrop */}
      <div
        className="absolute inset-0 backdrop-blur-md"
        style={{
          background: `
            radial-gradient(
              circle at 30% 30%,
              rgba(var(--color-secondary) / 0.25),
              transparent 60%
            ),
            radial-gradient(
              circle at 70% 70%,
              rgba(var(--color-primary) / 0.2),
              transparent 65%
            ),
            rgba(0,0,0,0.4)
          `,
        }}
        onClick={onClose}
      />
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.35 } }}
        exit={{ opacity: 0, transition: { duration: 0.25 } }}
      >
        {/* CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 40 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
              type: "spring",
              stiffness: 120,   // ↓ slower
              damping: 26,      // ↑ smoother
              mass: 1.1,        // adds weight
            },
          }}
          exit={{
            opacity: 0,
            scale: 0.96,
            y: 20,
            transition: { duration: 0.3 },
          }}
          whileHover={{ y: -4 }}
          className="relative w-[95%] max-w-3xl rounded-xl overflow-hidden flex"
          style={{
            background: "rgb(var(--color-surface-elevated))",
            color: "rgb(var(--color-text))",
            border: "1px solid rgb(var(--color-border))",
            boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
          }}
        >
          {/* Image */}
          {data.image && (
            <div
              className="w-2/5 min-h-[260px]"
              style={{
                borderRight: "1px solid rgb(var(--color-border))",
              }}
            >
              <motion.img
                src={data.image}
                className="w-full h-full object-cover"
                initial={{ scale: 1.12 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.0, ease: "easeOut" }} // was 0.6
              />
            </div>
          )}

          {/* Content */}
          <div className="flex-1 p-6 flex flex-col">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.45 }}
              className="text-2xl font-semibold mb-3"
              style={{ color: "rgb(var(--color-secondary))" }}
            >
              {data.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="text-sm whitespace-pre-line flex-1"
              style={{
                color: "rgb(var(--color-text-muted))",
                lineHeight: 1.7,
              }}
            >
              {data.fullDescription}
            </motion.p>

            <motion.button
              onClick={onClose}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-5 py-2.5 rounded-md transition"
              style={{
                background: "rgb(var(--color-primary))",
                color: "rgb(var(--color-primary-foreground))",
              }}
            >
              Close
            </motion.button>
          </div>

          {/* Close icon */}
          <motion.button
            onClick={onClose}
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            whileHover={{ scale: 1.2 }}
            className="absolute top-4 right-4 text-sm"
            style={{ color: "rgb(var(--color-text-muted))" }}
          >
            ✕
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}