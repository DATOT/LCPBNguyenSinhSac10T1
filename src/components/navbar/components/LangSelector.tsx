import { motion, AnimatePresence } from "motion/react";
import { Globe, ChevronDown } from "lucide-react";
import { LANGUAGES } from "../constants";

interface LangSelectorProps {
  lang: string;
  isOpen: boolean;
  onToggle: () => void;
  onChange: (code: string) => void;
}

export function LangSelector({ lang, isOpen, onToggle, onChange }: LangSelectorProps) {
  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  return (
    <div style={{ position: "relative", flexShrink: 0 }}>
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={onToggle}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.35rem",
          padding: "0.35rem 0.7rem",
          borderRadius: 6,
          background: isOpen ? "rgb(var(--color-primary)/0.3)" : "transparent",
          border: "1px solid rgb(var(--color-primary)/0.25)",
          color: "rgb(var(--color-text)/0.85)",
          fontSize: "0.78rem",
          cursor: "pointer",
          letterSpacing: "0.04em",
        }}
      >
        <Globe size={13} />
        <span>{current.flag}</span>
        <span style={{ fontWeight: 500 }}>{current.code.toUpperCase()}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={11} />
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{   opacity: 0, y: -6,  scale: 0.96 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              right: 0,
              background: "rgb(var(--color-primary))",
              border: "1px solid rgb(var(--color-primary)/0.35)",
              borderRadius: 8,
              overflow: "hidden",
              minWidth: 150,
              boxShadow: "0 8px 32px rgb(0 0 0 / 0.4)",
              zIndex: 200,
            }}
          >
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => onChange(l.code)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  padding: "0.6rem 1rem",
                  background: l.code === lang ? "rgb(var(--color-primary)/0.35)" : "transparent",
                  border: "none",
                  color: l.code === lang
                    ? "rgb(var(--color-accent))"
                    : "rgb(var(--color-text-opposite)/0.8)",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                  textAlign: "left",
                  letterSpacing: "0.03em",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgb(var(--color-primary)/0.2)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background =
                    l.code === lang ? "rgb(var(--color-primary)/0.35)" : "transparent")
                }
              >
                <span style={{ fontSize: "1rem" }}>{l.flag}</span>
                <span>{l.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
