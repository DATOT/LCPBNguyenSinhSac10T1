import { AnimatePresence } from "motion/react";
import type { NavbarProps } from "./types";
import { useNavbar } from "./hooks/useNavbar";
import { FullNavbar } from "./components/FullNavbar";
import { HelperWidget } from "./components/HelperWidget";

export default function Navbar({ sections }: NavbarProps) {
  const {
    isScrolled,
    activeSection,
    isDark,
    lang,
    scrollProgress,
    helperTop,
    scrollTo,
    changeLang,
    toggleTheme,
  } = useNavbar(sections);

  return (
    <AnimatePresence>
      {!isScrolled ? (
        <FullNavbar
          key="full"
          sections={sections}
          activeSection={activeSection}
          scrollProgress={scrollProgress}
          isDark={isDark}
          lang={lang}
          onScrollTo={scrollTo}
          onToggleTheme={toggleTheme}
          onChangeLang={changeLang}
        />
      ) : (
        <HelperWidget
          key="helper"
          sections={sections}
          activeSection={activeSection}
          helperTop={helperTop}
          isDark={isDark}
          lang={lang}
          onScrollTo={scrollTo}
          onToggleTheme={toggleTheme}
          onChangeLang={changeLang}
        />
      )}
    </AnimatePresence>
  );
}
