import { motion } from "framer-motion";
import React from "react";
import { MemberCard, MemberCardProps } from "./MemberCard";

interface MemberListProps {
  title: string;
  members: MemberCardProps[];
}

const MemberList = ({ title, members }: MemberListProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="overflow-hidden mt-2 rounded-xl p-3"
      style={{
        backgroundColor: "rgb(var(--color-surface) / 0.6)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(0,0,0,0.05)",
      }}
    >
      <div
        className="mb-3 text-base font-medium"
        style={{ color: "rgb(var(--color-text-muted))" }}
      >
        Meet {title}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {members.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
          >
            <MemberCard {...member} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default MemberList;