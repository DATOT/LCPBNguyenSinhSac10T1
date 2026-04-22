import { useState, useEffect, useCallback } from "react";
import type { Section } from "../types";
import { getLangFromURL, setLangInURL } from "../utils/url";

export function useNavbar(sections: Section[]) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(
    sections[0]?.id ?? "",
  );
  const [isDark, setIsDark] = useState(true);
  const [lang, setLang] = useState(getLangFromURL);
  const [scrollProgress, setScrollProgress] = useState(0);

  // ── Scroll tracking ────────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;

      setScrollProgress(maxScroll > 0 ? scrollY / maxScroll : 0);
      setIsScrolled(scrollY > 80);

      const offsets = sections
        .map((s) => {
          const el = document.getElementById(s.id);
          return el ? { id: s.id, top: el.getBoundingClientRect().top } : null;
        })
        .filter(Boolean) as { id: string; top: number }[];

      const active = offsets
        .filter((o) => o.top <= window.innerHeight * 0.4)
        .at(-1);
      if (active) setActiveSection(active.id);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sections]);

  // ── Theme ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.classList.toggle("light", !isDark);
  }, [isDark]);

  // ── Actions ────────────────────────────────────────────────────────────────
  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const changeLang = useCallback((code: string) => {
    setLang(code);
    setLangInURL(code);
    window.location.reload();
  }, []);

  const toggleTheme = useCallback(() => setIsDark((d) => !d), []);

  // ── Helper widget Y position ───────────────────────────────────────────────
  const helperTop = Math.max(
    80,
    Math.min(
      window.innerHeight - 220,
      80 + scrollProgress * (window.innerHeight - 300),
    ),
  );

  return {
    isScrolled,
    activeSection,
    isDark,
    lang,
    scrollProgress,
    helperTop,
    scrollTo,
    changeLang,
    toggleTheme,
  };
}
