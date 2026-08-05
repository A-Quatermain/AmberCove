import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "../data";

export const Navbar = ({ activeSection, scrollTo }) => {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    scrollTo(id);
    setOpen(false);
  };

  return (
    <motion.nav
      data-testid="main-nav"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-[100] transition-all duration-500 ${
        solid
          ? "backdrop-blur-xl bg-[#0A0A0A]/80 border-b border-white/10 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 flex items-center justify-between">
        <button
          data-testid="nav-logo"
          onClick={() => go("home")}
          className="group flex items-center gap-2"
        >
          <span className="font-serif text-2xl md:text-[26px] tracking-tight text-[#F5F0E8]">
            Amber<span className="text-[#C8963E]">Cove</span>
          </span>
        </button>

        <div className="hidden md:flex items-center gap-9">
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              data-testid={`nav-link-${l.id}`}
              onClick={() => go(l.id)}
              className="relative font-body text-[13px] uppercase tracking-[0.14em] text-[#F5F0E8]/70 hover:text-[#F5F0E8] transition-colors duration-300 py-1"
            >
              {l.label}
              {activeSection === l.id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute -bottom-0.5 left-0 h-px w-full bg-[#C8963E]"
                />
              )}
            </button>
          ))}
        </div>

        <button
          data-testid="nav-cta"
          onClick={() => go("contact")}
          className="hidden md:inline-flex items-center px-6 py-2.5 border border-[#C8963E]/50 text-[#C8963E] font-body text-[11px] uppercase tracking-[0.2em] hover:bg-[#C8963E] hover:text-[#0A0A0A] transition-all duration-300"
        >
          Book Consultation
        </button>

        <button
          data-testid="nav-mobile-toggle"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-[#F5F0E8] p-1"
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="nav-mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden backdrop-blur-xl bg-[#0A0A0A]/95 border-t border-white/10 mt-4"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {NAV_LINKS.map((l) => (
                <button
                  key={l.id}
                  data-testid={`nav-mobile-link-${l.id}`}
                  onClick={() => go(l.id)}
                  className="text-left font-serif text-2xl text-[#F5F0E8]/80 hover:text-[#C8963E] transition-colors"
                >
                  {l.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
