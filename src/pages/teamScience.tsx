import * as FooterSection from "../sections/Footer/Section";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MemberList from "@/components/members/MemberList";
import PdfViewer from "@/components/pdf/PdfViewer";
import { getContent, getLang } from "@/i18n";
import TeamNavbar from "@/components/teamNavbar/teamNavbar";

const TeamScience = () => {
  const lang = getLang();
  const content = getContent(lang);
  const [activeTab, setActiveTab] = useState<"pdf" | "infographic">("pdf");
  const [lightbox, setLightbox] = useState(false);

  const fadeUp = {
    hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const tabContentVariants = {
    hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      y: -10,
      filter: "blur(6px)",
      transition: { duration: 0.25 },
    },
  };

  return (
    <div className="relative min-h-screen px-4 py-10 overflow-hidden">
      <TeamNavbar currentHref="/#/teamScience"/>
      {/* Science-themed ambient — cool emerald/teal/indigo */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[460px] h-[460px] bg-emerald-500/15 blur-[140px] top-0 left-1/2 -translate-x-1/2" />
        <div className="absolute w-[300px] h-[300px] bg-teal-400/10 blur-[110px] top-1/3 right-0" />
        <div className="absolute w-[280px] h-[280px] bg-indigo-500/10 blur-[120px] bottom-0 left-0" />
        {/* subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>
      
      {/* Team heading — science-styled */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp as any}
        transition={{ delay: 0.05 }}
        className="mb-10"
      >
        {/*
        <div className="flex items-center gap-3 mb-1">
          <span className="text-emerald-400 text-2xl select-none">⚛</span>
          <span className="text-xs font-mono tracking-[0.25em] uppercase text-emerald-400/70 border border-emerald-500/20 px-3 py-1 rounded-full bg-emerald-500/5">
            Research & Science
          </span>
        </div>*/}

        <h1
          className="text-4xl md:text-5xl font-mono font-bold tracking-tighter mt-3"
          style={{ color: "rgb(var(--color-text))" }}
        >
          {"{"}
          <span className="text-emerald-400">Science</span>
          {" Team}"}
        </h1>
        <div className="mt-1 h-px w-40 bg-gradient-to-r from-emerald-400/50 to-transparent" />
      </motion.div>

      {/* Member List */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp as any}
        transition={{ delay: 0.15 }}
      >
        <MemberList
          members={content.teamScience.members}
          title={content.teamScience.title}
        />
      </motion.div>

      {/* Research Materials */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp as any}
        transition={{ delay: 0.25 }}
        className="my-12"
      >
        {/* Section label */}
        <div className="flex items-center gap-3 mb-5">
          <span className="text-xs font-mono tracking-[0.2em] uppercase text-teal-400/80 border border-teal-400/20 px-3 py-1 rounded-full bg-teal-500/5">
            ◈ Research Materials
          </span>
        </div>

        {/* Tab switcher */}
        <div className="flex gap-2 mb-4">
          {(["pdf", "infographic"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-4 py-1.5 rounded-lg text-sm font-mono tracking-wide transition-all duration-300 border ${
                activeTab === tab
                  ? "bg-emerald-500/15 border-emerald-400/30 text-emerald-300"
                  : "bg-transparent border-[rgb(var(--color-text))]/5 text-[rgb(var(--color-text))]/90 hover:text-[rgb(var(--color-text))]/50 hover:border-[rgb(var(--color-text))]/10"
              }`}
            >
              {tab === "pdf" ? "📄 Report" : "🖼 Infographic"}
              {activeTab === tab && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute inset-0 rounded-lg bg-emerald-500/10 border border-emerald-400/20"
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
          <AnimatePresence mode="wait">
            {activeTab === "pdf" ? (
              <motion.div
                key="pdf"
                variants={tabContentVariants as any}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="h-[600px]"
              >
                <PdfViewer
                  src={content.teamScience.docSrc}
                  title={content.teamScience.title}
                />
              </motion.div>
            ) : (
              <motion.div
                key="infographic"
                variants={tabContentVariants as any}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative bg-black/20 backdrop-blur-sm"
              >
                <div className="absolute top-3 right-3 z-10">
                  <button
                    onClick={() => setLightbox(true)}
                    className="text-[10px] font-mono tracking-widest uppercase bg-black/50 text-teal-300 px-3 py-1.5 rounded-full border border-teal-400/20 backdrop-blur-sm hover:bg-teal-500/10 transition-colors"
                  >
                    ⤢ Expand
                  </button>
                </div>
                <img
                  src={content.teamScience.infographicSrc}
                  alt="Science Infographic"
                  className="w-full object-contain max-h-[600px] cursor-zoom-in"
                  onClick={() => setLightbox(true)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setLightbox(false)}
          >
            <motion.img
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              src={content.teamScience.infographicSrc}
              alt="Science Infographic"
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl cursor-zoom-out"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute top-5 right-5 text-white/50 hover:text-white font-mono text-sm border border-white/10 px-3 py-1 rounded-full hover:bg-white/5 transition-colors"
              onClick={() => setLightbox(false)}
            >
              ✕ close
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-16">
        <FooterSection.default
          projectInfo={content.footer.projectInfo}
          heritageInfo={content.footer.heritageInfo}
          contact={content.footer.contact}
          sources={content.footer.sources}
        />
      </div>
    </div>
  );
};

export default TeamScience;