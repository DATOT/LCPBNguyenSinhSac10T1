import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    <div className="w-80">
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-xl shadow hover:bg-blue-600 transition"
      >
        Members
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mt-2 bg-gray-100 rounded-2xl p-3 space-y-2 shadow-lg"
          >
            {members.map((member, index) => (
              <MemberCard
                key={index}
                image={member.image}
                name={member.name}
                role={member.role}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
