import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface MemberLinkProps {
  title: string;
  href: string;
}

export default function MemberLink({ title, href }: MemberLinkProps) {
  return (
    <motion.a
      href={href}
      className="w-full px-4 py-2 rounded-md transition flex items-center justify-between"
      style={{
        backgroundColor: "rgb(var(--color-surface))",
        color: "rgb(var(--color-text))",
        border: "1px solid rgba(0,0,0,0.05)",
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="font-medium">{title}</span>
    </motion.a>
  );
}