import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

export const Reveal = ({ children, delay = 0, y = 44, className = "", once = true }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once, margin: "-80px" }}
    transition={{ duration: 0.9, delay, ease: EASE }}
  >
    {children}
  </motion.div>
);

// Masked line-by-line reveal for hero headlines
export const MaskLine = ({ children, index = 0, className = "" }) => (
  <span className="block overflow-hidden">
    <motion.span
      className={`block ${className}`}
      initial={{ y: "115%" }}
      animate={{ y: 0 }}
      transition={{ duration: 1.05, delay: 0.35 + index * 0.13, ease: EASE }}
    >
      {children}
    </motion.span>
  </span>
);

export const Overline = ({ children, className = "" }) => (
  <span
    className={`inline-flex items-center gap-3 font-body text-[11px] md:text-xs uppercase tracking-[0.32em] text-[#C8963E] ${className}`}
  >
    <span className="h-px w-8 bg-[#C8963E]/60" />
    {children}
  </span>
);
