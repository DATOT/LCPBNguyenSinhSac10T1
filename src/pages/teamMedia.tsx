import * as FooterSection from "../sections/Footer/Section";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MemberList from "@/components/members/MemberList";
import { getContent, getLang } from "@/i18n";
import TeamNavbar from "@/components/teamNavbar/teamNavbar";

const TeamMedia = () => {
  const lang = getLang();
  const content = getContent(lang);
  const [activeVideo, setActiveVideo] = useState<"recap" | "trailer" | null>(
    null
  );
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

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardReveal = {
    hidden: { opacity: 0, y: 30, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div className="relative min-h-screen px-4 py-2 overflow-hidden">
      <TeamNavbar currentHref="/#/teamMedia"/>
      {/* Member List */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp as any}
        transition={{ delay: 0.3 }}
      >
        <h1
          className="m-2 text-4xl md:text-4xl opacity-70 text-rose-500"
        >
          {"Media Team"}
        </h1>
        <MemberList
          members={content.teamMedia.members}
          title={content.teamMedia.title}
        />
      </motion.div>
      {/* Ambient background — warm cinematic palette */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[500px] h-[500px] bg-rose-500/15 blur-[140px] top-0 left-1/3 -translate-x-1/2" />
        <div className="absolute w-[350px] h-[350px] bg-amber-400/10 blur-[110px] top-1/4 right-0" />
        <div className="absolute w-[300px] h-[300px] bg-orange-500/10 blur-[120px] bottom-0 left-0" />
      </div>

      {/* Header */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp as any}
        className="mb-2"
      >
        <h1
          className="text-4xl md:text-4xl font-semibold tracking-tight"
          style={{ color: "rgb(var(--color-text))" }}
        >
          {content.productText}
        </h1>
      </motion.div>

      {/* Media Showcase */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer as any}
        className="mb-14"
      >
        {/* Section label */}
        <motion.div variants={cardReveal as any} className="mb-5">
          <span className="text-xs font-mono tracking-[0.2em] uppercase text-rose-400/80 border border-rose-400/20 px-3 rounded-full bg-rose-500/5">
            ✦ Productions
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Poster */}
          <motion.div
            variants={cardReveal as any}
            className="group relative rounded-2xl overflow-hidden border border-white/5 bg-white/2 backdrop-blur-sm shadow-xl md:col-span-1"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 pointer-events-none" />
            <div className="absolute top-3 left-3 z-20">
              <span className="text-[10px] font-mono tracking-widest uppercase bg-black/50 text-rose-300 px-2 py-1 rounded-full border border-rose-400/20 backdrop-blur-sm">
                Poster
              </span>
            </div>
            <div className="absolute top-3 right-3 z-20">
              <button
                onClick={() => setLightbox(true)}
                className="text-[10px] font-mono tracking-widest uppercase bg-black/50 text-rose-300 px-3 py-1.5 rounded-full border border-rose-400/20 backdrop-blur-sm hover:bg-rose-500/10 transition-colors"
              >
                ⤢ Expand
              </button>
            </div>
            <img
              src={content.teamMedia.posterSrc}
              alt="Official Poster"
              className="w-full h-full object-cover aspect-[2/3] transition-transform duration-700 group-hover:scale-105 cursor-zoom-in"
              onClick={() => setLightbox(true)}
            />
          </motion.div>

          {/* Videos */}
          <div className="md:col-span-2 flex flex-col gap-4">
            {/* Recap Video */}
            <motion.div
              variants={cardReveal as any}
              className="group relative rounded-2xl overflow-hidden border border-white/5 bg-white/2 backdrop-blur-sm shadow-xl flex-1"
              style={{ minHeight: "200px" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent pointer-events-none" />
              <div className="absolute top-3 left-3 z-20">
                <span className="text-[10px] font-mono tracking-widest uppercase bg-black/50 text-amber-300 px-2 py-1 rounded-full border border-amber-400/20 backdrop-blur-sm">
                  Recap
                </span>
              </div>

              {activeVideo === "recap" ? (
                <video
                  src={content.teamMedia.recapSrc}
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                  style={{ minHeight: "200px" }}
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center cursor-pointer"
                  style={{ minHeight: "200px" }}
                  onClick={() => setActiveVideo("recap")}
                >
                  {/* Decorative film-strip lines */}
                  <div className="absolute inset-0 opacity-5 pointer-events-none"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(90deg, transparent, transparent 18px, rgba(255,255,255,0.4) 18px, rgba(255,255,255,0.4) 20px)",
                    }}
                  />
                  <div className="flex flex-col items-center gap-3 z-10">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-14 h-14 rounded-full bg-amber-400/90 flex items-center justify-center shadow-lg shadow-amber-500/30"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 text-black ml-1"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </motion.div>
                    <span className="text-sm font-mono text-white/60">
                      Play Recap
                    </span>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Trailer Video */}
            <motion.div
              variants={cardReveal as any}
              className="group relative rounded-2xl overflow-hidden border border-white/5 bg-white/2 backdrop-blur-sm shadow-xl flex-1"
              style={{ minHeight: "200px" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent pointer-events-none" />
              <div className="absolute top-3 left-3 z-20">
                <span className="text-[10px] font-mono tracking-widest uppercase bg-black/50 text-rose-300 px-2 py-1 rounded-full border border-rose-400/20 backdrop-blur-sm">
                  Trailer
                </span>
              </div>

              {activeVideo === "trailer" ? (
                <video
                  src={content.teamMedia.trailerSrc}
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                  style={{ minHeight: "200px" }}
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center cursor-pointer"
                  style={{ minHeight: "200px" }}
                  onClick={() => setActiveVideo("trailer")}
                >
                  <div
                    className="absolute inset-0 opacity-5 pointer-events-none"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(90deg, transparent, transparent 18px, rgba(255,255,255,0.4) 18px, rgba(255,255,255,0.4) 20px)",
                    }}
                  />
                  <div className="flex flex-col items-center gap-3 z-10">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-14 h-14 rounded-full bg-rose-400/90 flex items-center justify-center shadow-lg shadow-rose-500/30"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 text-black ml-1"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </motion.div>
                    <span className="text-sm font-mono text-white/60">
                      Play Trailer
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
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
              src={content.teamMedia.posterSrc}
              alt="Poster Expanded"
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

export default TeamMedia;