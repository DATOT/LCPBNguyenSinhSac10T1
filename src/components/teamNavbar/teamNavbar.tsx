import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getContent, getLang } from "@/i18n";
import type { Team } from "@/sections/MemberList/Section";

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

  // close menu on route change / resize
  useEffect(() => {
    setMenuOpen(false);
  }, [currentHref]);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-white/60 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-4">

          {/* Home button */}
          <a
            href="/"
            className="group flex items-center gap-2 shrink-0 mr-2"
          >
            <span className="relative flex items-center justify-center w-7 h-7 rounded-md border border-white/10 bg-black/5 group-hover:bg-black/10 group-hover:border-white/20 transition-all duration-200">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="w-3.5 h-3.5 text-black/50 group-hover:text-white/80 transition-colors"
              >
                <path d="M3 12L12 4l9 8" />
                <path d="M9 21V12h6v9" />
              </svg>
            </span>
            <span className="hidden sm:block text-[11px] font-mono tracking-widest uppercase text-black/30 group-hover:text-black/60 transition-colors">
              Home
            </span>
          </a>

          {/* Divider */}
          <div className="hidden sm:block h-4 w-px bg-white/10 shrink-0" />

          {/* Desktop team links */}
          <div className="hidden md:flex items-center gap-1 flex-1 overflow-x-auto scrollbar-none">
            {teams.map((team) => {
              const isActive = currentHref === team.href;
              return (
                <a
                  key={team.href}
                  href={team.href}
                  className="relative shrink-0 px-3 py-1.5 rounded-lg text-[12px] font-mono tracking-wide transition-all duration-200 group"
                >
                  {isActive ? (
                    <>
                      <motion.span
                        layoutId="nav-active-bg"
                        className="absolute inset-0 rounded-lg bg-black/8 border border-black/10"
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      />
                      <span
                        className="relative font-semibold"
                        style={{ color: "rgb(var(--color-text))" }}
                      >
                        {team.title}
                      </span>
                      {/* active dot */}
                      <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white/50" />
                    </>
                  ) : (
                    <span className="relative text-black/35 group-hover:text-black/65 transition-colors">
                      {team.title}
                    </span>
                  )}
                </a>
              );
            })}
          </div>

          {/* Spacer on desktop */}
          <div className="flex-1 md:hidden" />

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px] group"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="block w-5 h-px bg-white/50 group-hover:bg-white/80 transition-colors origin-center"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="block w-5 h-px bg-white/50 group-hover:bg-white/80 transition-colors"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="block w-5 h-px bg-white/50 group-hover:bg-white/80 transition-colors origin-center"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(8px)" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-14 left-0 right-0 z-39 md:hidden bg-black/80 backdrop-blur-2xl border-b border-white/5 shadow-2xl"
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
                    transition={{ delay: i * 0.04, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-xl font-mono text-sm tracking-wide transition-all duration-200 ${
                      isActive
                        ? "bg-white/8 border border-white/10 text-white"
                        : "text-white/40 hover:text-white/70 hover:bg-white/5"
                    }`}
                  >
                    <span>{team.title}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                    )}
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer so content doesn't sit under fixed nav */}
      <div className="h-14" />
    </>
  );
};

export default TeamNavbar;