import * as FooterSection from "../sections/Footer/Section";
import React, { useState } from "react";
import { motion } from "framer-motion";
import MemberList from "@/components/members/MemberList";
import { getContent, getLang } from "@/i18n";
import TeamNavbar from "@/components/teamNavbar/teamNavbar";

const TeamPresentation = () => {
  const lang = getLang();
  const content = getContent(lang);
  const [playing, setPlaying] = useState(false);

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

  return (
    <div className="relative min-h-screen px-4 py-10 overflow-hidden">
      <TeamNavbar currentHref="/#/teamPresentation" />
      {/* Ambient — warm gold/violet for a stage/spotlight feel */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[420px] h-[420px] bg-violet-500/15 blur-[140px] top-0 left-1/2 -translate-x-1/2" />
        <div className="absolute w-[320px] h-[320px] bg-yellow-400/10 blur-[110px] top-1/4 right-0" />
        <div className="absolute w-[260px] h-[260px] bg-fuchsia-500/10 blur-[120px] bottom-0 left-0" />
        {/* spotlight cone from top */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-[180px] opacity-10"
          style={{
            background: "linear-gradient(to bottom, rgba(250,220,100,0.8), transparent)",
            boxShadow: "0 0 80px 40px rgba(250,220,80,0.08)",
          }}
        />
      </div>

      {/* Team heading */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp as any}
        transition={{ delay: 0.05 }}
        className="mb-10"
      >
        {/*<div className="flex items-center gap-3 mb-1">
          <span className="text-yellow-400 text-xl select-none">🎤</span>
          <span className="text-xs font-mono tracking-[0.25em] uppercase text-yellow-400/70 border border-yellow-500/20 px-3 py-1 rounded-full bg-yellow-500/5">
            Public Speaking & Presentation
          </span>
        </div>*/}

        <h1
          className="text-4xl md:text-5xl font-serif font-bold italic tracking-tight mt-3"
          style={{ color: "rgb(var(--color-text))" }}
        >
          Presentation{" "}
          <span className="not-italic font-mono text-3xl text-yellow-400/80">
            Team
          </span>
        </h1>
        <div className="mt-1 h-px w-48 bg-gradient-to-r from-yellow-400/40 via-violet-400/30 to-transparent" />
      </motion.div>

      {/* Member List */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp as any}
        transition={{ delay: 0.15 }}
      >
        <MemberList
          members={content.teamPresentation.members}
          title={content.teamPresentation.title}
        />
      </motion.div>

      {/* About Video */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp as any}
        transition={{ delay: 0.25 }}
        className="my-12"
      >
        <a href={content.teamPresentation.aboutVideoSrc} className="flex items-center gap-3 mb-5">
          <span className="font-mono tracking-[0.2em] uppercase text-violet-400/80 border border-violet-400/20 px-3 py-1 rounded-full bg-violet-500/5">
            ▶ Watch About Video Here
          </span>
        </a>

        <a className="relative rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-black">
          {/* decorative stage curtain strips */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, transparent, transparent 48px, rgba(255,255,255,0.6) 48px, rgba(255,255,255,0.6) 50px)",
            }}
          />

        </a>
      </motion.div >

      <div className="mt-16">
        <FooterSection.default
          projectInfo={content.footer.projectInfo}
          heritageInfo={content.footer.heritageInfo}
          contact={content.footer.contact}
          sources={content.footer.sources}
        />
      </div>
    </div >
  );
};

export default TeamPresentation;