import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HistoryItem } from "../types";

type Props = {
  item: HistoryItem;
  isActive: boolean;
  isHovered: boolean;
  onClick: () => void;
  onHoverStart: () => void;
  onHoverEnd: () => void;
};

export default function TimelineDot({
  item,
  isActive,
  isHovered,
  onClick,
  onHoverStart,
  onHoverEnd,
}: Props) {
  const emphasis = isActive ? "active" : isHovered ? "hover" : "idle";

  return (
    <motion.div
      className="relative flex items-center group cursor-pointer"
      onClick={onClick}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
    >
      {/* DOT */}
      <motion.div
        className="w-2 h-2 rounded-full bg-black z-10"
        animate={{
          scale: emphasis === "active" ? 2 : emphasis === "hover" ? 1.4 : 1,
          opacity: emphasis === "active" ? 1 : emphasis === "hover" ? 0.6 : 0.35,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />

      {/* LABEL */}
      <AnimatePresence>
        {emphasis !== "idle" && (
          <motion.div
            className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap text-sm font-bold text-black/70"
            initial={{ opacity: 0, x: -6 }}
            animate={{
              opacity: emphasis === "active" ? 1 : 0.7,
              x: 0,
              scale: emphasis === "active" ? 1 : 0.95,
            }}
            exit={{ opacity: 0, x: -6 }}
          >
            {item.year}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}