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
        className="w-full px-4 py-2 bg-gray-300 text-gray-500 rounded-sm shadow hover:bg-gray-400 transition flex items-center justify-between"
      >
        <span>{title}</span>

        {/* Animated icon */}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={20} />
        </motion.span>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden mt-2 bg-gray-100 rounded-2xl p-3 shadow-lg"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="mb-3 text-lg font-semibold text-gray-700"
            >
              Meet {title}
            </motion.div>

            <div className="grid grid-cols-2 gap-3">
              {members.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
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
