import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { MemberCard, MemberCardProps } from "./MemberCard";

interface MemberDropdownProps {
  title: string;
  members: MemberCardProps[];
}

export default function MemberDropdown({
  title,
  members,
}: MemberDropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-2 rounded-md transition flex items-center justify-between"
        style={{
          backgroundColor: "rgb(var(--color-surface))",
          color: "rgb(var(--color-text))",
          border: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <span className="font-medium">{title}</span>

        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={18} />
        </motion.span>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -8, height: 0 }}
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
        )}
      </AnimatePresence>
    </div>
  );
}