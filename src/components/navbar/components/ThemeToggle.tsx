import { motion, AnimatePresence } from "motion/react";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92, rotate: 15 }}
      onClick={onToggle}
      style={{
        flexShrink: 0,
        width: 36,
        height: 36,
        borderRadius: "50%",
        background: "rgb(var(--color-primary)/0.25)",
        border: "1px solid rgb(var(--color-primary)/0.35)",
        color: "rgb(var(--color-text))",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "background 0.2s",
      }}
    >
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.span
            key="sun"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0,   opacity: 1 }}
            exit={{   rotate:  90,  opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sun size={15} />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate:  90, opacity: 0 }}
            animate={{ rotate:   0, opacity: 1 }}
            exit={{   rotate: -90,  opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Moon size={15} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
