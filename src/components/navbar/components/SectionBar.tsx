import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Section } from "../types";

interface SectionBarProps {
  section: Section;
  isActive: boolean;
  onClick: () => void;
}

export function SectionBar({ section, isActive, onClick }: SectionBarProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
      <motion.button
        whileHover={{ scaleX: 1.18 }}
        whileTap={{ scaleX: 0.9 }}
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "block",
          width: isActive ? 28 : 18,
          height: 5,
          borderRadius: 3,
          background: isActive
            ? "linear-gradient(90deg, rgb(var(--color-secondary)), rgb(var(--color-accent)))"
            : "rgb(var(--color-primary)/0.45)",
          border: "none",
          cursor: "pointer",
          padding: 0,
          transition: "width 0.3s cubic-bezier(.4,0,.2,1), background 0.3s",
          transformOrigin: "right center",
        }}
      />

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: 6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 6 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "absolute",
              right: "calc(100% + 10px)",
              background: "rgb(var(--color-blue-dark))",
              border: "1px solid rgb(var(--color-primary)/0.35)",
              borderRadius: 6,
              padding: "0.25rem 0.6rem",
              fontSize: "0.72rem",
              fontWeight: 500,
              letterSpacing: "0.05em",
              color: "rgb(var(--color-text)/0.9)",
              whiteSpace: "nowrap",
              pointerEvents: "none",
              boxShadow: "0 2px 12px rgb(0 0 0 / 0.35)",
            }}
          >
            {section.label}
            <span
              style={{
                position: "absolute",
                right: -5,
                top: "50%",
                transform: "translateY(-50%)",
                width: 8,
                height: 8,
                background: "rgb(var(--color-blue-dark))",
                border: "1px solid rgb(var(--color-primary)/0.35)",
                borderLeft: "none",
                borderBottom: "none",
                rotate: "45deg",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
