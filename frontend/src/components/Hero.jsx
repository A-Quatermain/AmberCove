import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { MaskLine } from "./motion";
import { IMAGES } from "../data";

export const Hero = ({ scrollTo }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.9]);

  return (
    <section
      id="home"
      ref={ref}
      data-testid="hero-section"
      className="relative h-screen min-h-[680px] w-full overflow-hidden"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src={IMAGES.hero}
          alt="Luxury South Florida outdoor living at dusk"
          className="h-full w-full object-cover"
        />
      </motion.div>

      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/70 via-[#0A0A0A]/40 to-[#0A0A0A]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(200,150,62,0.14),transparent_55%)]" />

      {/* Framing lines */}
      <div className="absolute inset-x-6 md:inset-x-10 top-28 bottom-10 border-x border-white/10 pointer-events-none" />

      <div className="relative z-10 h-full mx-auto max-w-[1400px] px-6 md:px-10 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-3 font-body text-[11px] md:text-xs uppercase tracking-[0.34em] text-[#C8963E]">
            <span className="h-px w-10 bg-[#C8963E]/60" />
            South Florida's Premier Outdoor Living Studio
          </span>
        </motion.div>

        <h1 className="font-serif font-light text-[#F5F0E8] text-[3.2rem] leading-[0.95] sm:text-6xl md:text-7xl lg:text-[7.5rem] lg:leading-[0.92] tracking-tight max-w-[15ch]">
          <MaskLine index={0}>Where Architecture</MaskLine>
          <MaskLine index={1} className="italic text-[#C8963E]">
            Meets the Open Air
          </MaskLine>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.9 }}
          className="mt-8 max-w-xl font-body text-base md:text-lg leading-relaxed text-[#F5F0E8]/70"
        >
          Bespoke outdoor kitchens, pergolas, hardscapes, and living spaces crafted
          for discerning homeowners across South Florida's most coveted addresses.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.9 }}
          className="mt-11 flex flex-wrap items-center gap-4"
        >
          <button
            data-testid="hero-portfolio-cta"
            onClick={() => scrollTo("portfolio")}
            className="group inline-flex items-center gap-3 bg-[#C8963E] px-9 py-4 text-[#0A0A0A] font-body text-[12px] font-semibold uppercase tracking-[0.2em] hover:bg-[#E0AE52] transition-colors duration-300"
          >
            View Our Work
          </button>
          <button
            data-testid="hero-contact-cta"
            onClick={() => scrollTo("contact")}
            className="inline-flex items-center px-9 py-4 border border-[#F5F0E8]/25 text-[#F5F0E8] font-body text-[12px] uppercase tracking-[0.2em] hover:border-[#C8963E] hover:text-[#C8963E] transition-all duration-300"
          >
            Schedule Consultation
          </button>
        </motion.div>
      </div>

      <motion.button
        onClick={() => scrollTo("about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 text-[#F5F0E8]/50 hover:text-[#C8963E] transition-colors"
        data-testid="hero-scroll-indicator"
      >
        <span className="font-body text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} />
        </motion.span>
      </motion.button>
    </section>
  );
};
