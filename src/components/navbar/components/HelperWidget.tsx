import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sun, Moon } from "lucide-react";
import type { Section } from "../types";
import { SectionBar } from "./SectionBar";
import { LANGUAGES } from "../constants";

interface HelperWidgetProps {
  sections: Section[];
  activeSection: string;
  helperTop: number;
  isDark: boolean;
  lang: string;
  onScrollTo: (id: string) => void;
  onToggleTheme: () => void;
  onChangeLang: (code: string) => void;
}

export function HelperWidget({
  sections,
  activeSection,
  helperTop,
  isDark,
  lang,
  onScrollTo,
  onToggleTheme,
  onChangeLang,
}: HelperWidgetProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <motion.div
      key="helper"
      ref={ref}
      initial={{ x: 60, opacity: 0 }}
      animate={{ x: 0,  opacity: 1 }}
      exit={{   x: 60,  opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{
        position: "fixed",
        right: 14,
        top: 10,
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "0.35rem",
        userSelect: "none",
      }}
    >
      {/* Section bars */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.28rem",
          background: "rgb(var(--color-background)/0.9)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgb(var(--color-primary)/0.3)",
          borderRadius: 10,
          padding: "0.55rem 0.6rem",
          boxShadow: "0 4px 24px rgb(0 0 0 / 0.35)",
        }}
      >
        {sections.map((s) => (
          <SectionBar
            key={s.id}
            section={s}
            isActive={s.id === activeSection}
            onClick={() => onScrollTo(s.id)}
          />
        ))}
      </div>

      {/* Hamburger button */}
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.93 }}
        onClick={() => setMenuOpen((v) => !v)}
        style={{
          width: 36, height: 36,
          borderRadius: 8,
          background: menuOpen
            ? "rgb(var(--color-primary)/0.5)"
            : "rgb(var(--color-background)/0.9)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgb(var(--color-primary)/0.3)",
          color: "rgb(var(--color-blue-dark))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 4px 14px rgb(0 0 0 / 0.3)",
        }}
      >
        <AnimatePresence mode="wait">
          {menuOpen ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0,   opacity: 1 }}
              exit={{   rotate:  90,  opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <X size={16} />
            </motion.span>
          ) : (
            <motion.span
              key="menu"
              initial={{ rotate:  90, opacity: 0 }}
              animate={{ rotate:   0, opacity: 1 }}
              exit={{   rotate: -90,  opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <Menu size={16} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Hamburger dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -8 }}
            animate={{ opacity: 1, scale: 1,   y: 0  }}
            exit={{   opacity: 0, scale: 0.9,  y: -8 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
            style={{
              background: "rgb(var(--color-background)/0.96)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgb(var(--color-primary)/0.3)",
              borderRadius: 10,
              padding: "0.7rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              minWidth: 140,
              boxShadow: "0 8px 32px rgb(0 0 0 / 0.45)",
              transformOrigin: "bottom right",
            }}
          >
            <Label>Theme</Label>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => { onToggleTheme(); setMenuOpen(false); }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.55rem",
                padding: "0.45rem 0.7rem",
                borderRadius: 7,
                background: "rgb(var(--color-primary)/0.2)",
                border: "1px solid rgb(var(--color-primary)/0.25)",
                color: "rgb(var(--color-blue-dark))",
                fontSize: "0.78rem",
                cursor: "pointer",
                width: "100%",
              }}
            >
              {isDark ? <Sun size={13} /> : <Moon size={13} />}
              <span>{isDark ? "Light mode" : "Dark mode"}</span>
            </motion.button>

            <Label>Language</Label>
            {LANGUAGES.map((l) => (
              <motion.button
                key={l.code}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => { onChangeLang(l.code); setMenuOpen(false); }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.55rem",
                  padding: "0.4rem 0.7rem",
                  borderRadius: 7,
                  background: l.code === lang
                    ? "rgb(var(--color-primary)/0.35)"
                    : "rgb(var(--color-primary)/0.08)",
                  border: l.code === lang
                    ? "1px solid rgb(var(--color-blue-dark)/0.4)"
                    : "1px solid rgb(var(--color-primary)/0.15)",
                  color: l.code === lang
                    ? "rgb(var(--color-blue-dark))"
                    : "rgb(var(--color-text)/0.7)",
                  fontSize: "0.77rem",
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                <span>{l.flag}</span>
                <span>{l.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Tiny inline label helper
function Label({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: "0.65rem",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "rgb(var(--color-text)/0.4)",
      }}
    >
      {children}
    </div>
  );
}
