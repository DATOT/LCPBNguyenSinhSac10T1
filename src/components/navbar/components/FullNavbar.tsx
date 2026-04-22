import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Section } from "../types";
import { ThemeToggle } from "./ThemeToggle";
import { LangSelector } from "./LangSelector";

interface FullNavbarProps {
  sections: Section[];
  activeSection: string;
  scrollProgress: number;
  isDark: boolean;
  lang: string;
  onScrollTo: (id: string) => void;
  onToggleTheme: () => void;
  onChangeLang: (code: string) => void;
}

export function FullNavbar({
  sections,
  activeSection,
  scrollProgress,
  isDark,
  lang,
  onScrollTo,
  onToggleTheme,
  onChangeLang,
}: FullNavbarProps) {
  const [langDropOpen, setLangDropOpen] = useState(false);

  return (
    <motion.nav
      key="fullnav"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
      style={{
        zIndex: 1000,
        background:
          "linear-gradient(180deg, rgb(var(--color-bg-beige)/0.96) 0%, rgb(var(--color-bg-beige)/0.80) 100%)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid rgb(var(--color-primary)/0.25)",
        boxShadow: "0 4px 32px rgb(0 0 0 / 0.35)",
      }}
    >
      {/* Progress bar */}
      <motion.div
        style={{
          position: "absolute",
          bottom: 0, left: 0,
          height: 2,
          background: "linear-gradient(90deg, rgb(var(--color-secondary)), rgb(var(--color-accent)))",
          width: `${scrollProgress * 100}%`,
        }}
        transition={{ ease: "linear", duration: 0.1 }}
      />

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 1.5rem",
          height: 64,
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        {/* Scrollable section list */}
        <div
          style={{
            flex: 1,
            overflowX: "auto",
            display: "flex",
            gap: "0.25rem",
            scrollbarWidth: "none"
          }}
        >
          {sections.map((s) => {
            const isActive = s.id === activeSection;
            return (
              <motion.button
                key={s.id}
                onClick={() => onScrollTo(s.id)}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  position: "relative",
                  flexShrink: 0,
                  padding: "0.35rem 0.9rem",
                  borderRadius: 6,
                  fontSize: "0.78rem",
                  fontWeight: isActive ? 600 : 400,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: isActive
                    ? "rgb(var(--color-accent))"
                    : "rgb(var(--color-text)/0.75)",
                  background: isActive ? "rgb(var(--color-primary)/0.3)" : "transparent",
                  border: "none",
                  cursor: "pointer",
                  transition: "color 0.2s, background 0.2s",
                  whiteSpace: "nowrap",
                }}
              >
                {s.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-active-pill"
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: 6,
                      border: "1px solid rgb(var(--color-accent)/0.4)",
                      pointerEvents: "none",
                    }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Divider */}
        <div
          style={{
            width: 1, height: 28,
            background: "rgb(var(--color-primary)/0.4)",
            flexShrink: 0,
          }}
        />

        <LangSelector
          lang={lang}
          isOpen={langDropOpen}
          onToggle={() => setLangDropOpen((v) => !v)}
          onChange={(code) => { onChangeLang(code); setLangDropOpen(false); }}
        />

        <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
      </div>
    </motion.nav>
  );
}
