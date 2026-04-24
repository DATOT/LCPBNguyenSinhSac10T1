import * as FooterSection from "../sections/Footer/Section";
import React from "react";
import { motion } from "framer-motion";
import MemberList from "@/components/members/MemberList";
import { getContent, getLang } from "@/i18n";
import TeamNavbar from "@/components/teamNavbar/teamNavbar";

const TeamIT = () => {
  const lang = getLang();
  const content = getContent(lang);

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
      <TeamNavbar currentHref="/#/teamIT"/>
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[400px] h-[400px] bg-blue-500/20 blur-[120px] top-0 left-1/2 -translate-x-1/2" />
        <div className="absolute w-[300px] h-[300px] bg-cyan-400/10 blur-[100px] bottom-0 right-0" />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp as any}
        transition={{ delay: 0.2 }}
      >
        <h1
          className="mt-2 text-4xl md:text-4xl font-mono opacity-70"
          style={{ color: "rgb(var(--color-text-muted))" }}
        >
          {"< IT Team />"}
        </h1>
        <MemberList
          members={content.teamIT.members}
          title={content.teamIT.title}
        />
      </motion.div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp as any}
        className="my-10"
      >
        <h1
          className="text-4xl md:text-4xl font-semibold tracking-tight mb-4"
          style={{ color: "rgb(var(--color-text))" }}
        >
          {content.productText}
        </h1>

        <p className="bg-gray-900 text-green-400 font-mono p-4 rounded-lg overflow-x-auto">
          {content.teamIT.productInfo}
        </p>

      </motion.div>

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

export default TeamIT;