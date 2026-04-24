import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getContent, getLang } from "@/i18n";
import type { Team } from "@/sections/MemberList/Section";
import { ThemeToggle } from "../navbar/components/ThemeToggle";

type TeamNavbarProps = {
  currentHref?: string;
};

const TeamNavbar: React.FC<TeamNavbarProps> = ({ currentHref }) => {
  const lang = getLang();
  const content = getContent(lang);
  const teams: Team[] = content.teamsSection.teams;

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [currentHref]);

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-[rgb(var(--color-background)/0.6)] backdrop-blur-xl border-b border-[rgb(var(--color-border)/0.4)] shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-4">

          {/* HOME */}
          <a href="/" className="group flex items-center gap-2 shrink-0 mr-2">
            <span className="flex items-center justify-center w-7 h-7 rounded-md border border-[rgb(var(--color-border)/0.4)] bg-[rgb(var(--color-surface)/0.6)] group-hover:bg-[rgb(var(--color-surface)/0.9)] transition">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="w-3.5 h-3.5 text-[rgb(var(--color-text)/0.5)] group-hover:text-[rgb(var(--color-text))]"
              >
                <path d="M3 12L12 4l9 8" />
                <path d="M9 21V12h6v9" />
              </svg>
            </span>

            <span className="hidden sm:block text-sm tracking-widest text-[rgb(var(--color-text-muted)/0.7)] group-hover:text-[rgb(var(--color-text))]">
              Home
            </span>
          </a>

          {/* DIVIDER */}
          <div className="hidden sm:block h-4 w-px bg-[rgb(var(--color-border)/0.5)]" />

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-1 flex-1 overflow-x-auto scrollbar-none">
            {teams.map((team) => {
              const isActive = currentHref === team.href;

              return (
                <a
                  key={team.href}
                  href={team.href}
                  className="relative px-3 py-1.5 rounded-lg text-sm tracking-wide group"
                >
                  {isActive ? (
                    <>
                      <motion.span
                        layoutId="nav-active-bg"
                        className="absolute inset-0 rounded-lg bg-[rgb(var(--color-primary)/0.12)] border border-[rgb(var(--color-primary)/0.3)]"
                        transition={{ duration: 0.35 }}
                      />
                      <span className="relative font-semibold text-[rgb(var(--color-text))]">
                        {team.title}
                      </span>

                      <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[rgb(var(--color-primary))]" />
                    </>
                  ) : (
                    <span className="text-[rgb(var(--color-text-muted)/0.7)] group-hover:text-[rgb(var(--color-text))] transition">
                      {team.title}
                    </span>
                  )}
                </a>
              );
            })}
          </div>

          <div className="flex-1 md:hidden" />

          {/* HAMBURGER */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px] group"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={
                  menuOpen
                    ? i === 0
                      ? { rotate: 45, y: 7 }
                      : i === 1
                      ? { opacity: 0 }
                      : { rotate: -45, y: -7 }
                    : { rotate: 0, y: 0, opacity: 1 }
                }
                className="block w-5 h-px bg-[rgb(var(--color-text)/0.6)] group-hover:bg-[rgb(var(--color-text))]"
              />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(8px)" }}
            transition={{ duration: 0.3 }}
            className="fixed top-14 left-0 right-0 z-39 md:hidden bg-[rgb(var(--color-background)/0.9)] backdrop-blur-2xl border-b border-[rgb(var(--color-border)/0.4)] shadow-2xl"
          >
            <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1">
              {teams.map((team, i) => {
                const isActive = currentHref === team.href;

                return (
                  <motion.a
                    key={team.href}
                    href={team.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-xl transition text-sm ${
                      isActive
                        ? "bg-[rgb(var(--color-primary)/0.15)] border border-[rgb(var(--color-primary)/0.4)] text-[rgb(var(--color-text))]"
                        : "text-[rgb(var(--color-text-muted))] hover:text-[rgb(var(--color-text))] hover:bg-[rgb(var(--color-surface)/0.7)]"
                    }`}
                  >
                    <span>{team.title}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[rgb(var(--color-primary))]" />
                    )}
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SPACER */}
      <div className="h-14" />
    </>
  );
};

export default TeamNavbar;