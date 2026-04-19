import React from "react";
import { motion } from "framer-motion";

type Props = {
  title: string;
  description: string;
  isTop: boolean;
};

export default function TimelineCard({
  title,
  description,
  isTop,
}: Props) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: isTop ? 60 : -60,
        scale: 0.9,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{ once: false, amount: 0.6 }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 18,
      }}
      className="relative w-72"
    >
      {/* CARD BODY */}
      <div
        className="
          rounded-xl p-5
          border
          transition-all duration-300
          hover:-translate-y-1 hover:shadow-lg
        "
        style={{
          backgroundColor: "rgb(var(--color-surface-elevated))",
          borderColor: "rgb(var(--color-border))",
        }}
      >
        <h3
          className="text-xl font-bold"
          style={{ color: "rgb(var(--color-text))" }}
        >
          {title}
        </h3>

        <p
          className="mt-2 text-sm leading-relaxed"
          style={{ color: "rgb(var(--color-text-muted))" }}
        >
          {description}
        </p>
      </div>
    </motion.div>
  );
}