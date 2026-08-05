import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, Overline } from "./motion";
import { TESTIMONIALS } from "../data";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";

export const Testimonials = () => {
  const [i, setI] = useState(0);
  const t = TESTIMONIALS[i];
  const go = (dir) =>
    setI((prev) => (prev + dir + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section
      id="testimonials"
      data-testid="testimonials-section"
      className="relative bg-[#0A0A0A] py-24 md:py-36"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-14 text-center">
          <Reveal>
            <Overline>Client Voices</Overline>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-serif font-light text-4xl md:text-5xl lg:text-6xl tracking-tight text-[#F5F0E8]">
              Trusted by Those Who Expect the Best
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="relative mx-auto max-w-4xl border border-white/[0.08] bg-[#121212] px-8 py-14 md:px-20 md:py-20">
            <div className="absolute top-8 left-10 font-serif text-8xl text-[#C8963E]/15 leading-none select-none">
              "
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative text-center"
              >
                <div className="flex justify-center gap-1 mb-8">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} size={16} className="fill-[#C8963E] text-[#C8963E]" />
                  ))}
                </div>
                <p className="font-serif italic text-2xl md:text-4xl leading-snug text-[#F5F0E8] max-w-3xl mx-auto">
                  {t.quote}
                </p>
                <div className="mt-10 flex flex-col items-center gap-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="h-16 w-16 rounded-full object-cover ring-1 ring-[#C8963E]/40"
                  />
                  <div>
                    <div className="font-body text-sm font-semibold tracking-wide text-[#F5F0E8]">
                      {t.name}
                    </div>
                    <div className="mt-1 font-body text-[11px] uppercase tracking-[0.18em] text-[#C8963E]">
                      {t.title}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-12 flex items-center justify-center gap-4">
              <button
                data-testid="testimonial-prev"
                onClick={() => go(-1)}
                className="h-11 w-11 rounded-full border border-white/15 flex items-center justify-center text-[#F5F0E8]/70 hover:border-[#C8963E] hover:text-[#C8963E] transition-colors"
                aria-label="Previous"
              >
                <ArrowLeft size={16} />
              </button>
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, d) => (
                  <button
                    key={d}
                    data-testid={`testimonial-dot-${d}`}
                    onClick={() => setI(d)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      d === i ? "w-8 bg-[#C8963E]" : "w-1.5 bg-white/25"
                    }`}
                    aria-label={`Testimonial ${d + 1}`}
                  />
                ))}
              </div>
              <button
                data-testid="testimonial-next"
                onClick={() => go(1)}
                className="h-11 w-11 rounded-full border border-white/15 flex items-center justify-center text-[#F5F0E8]/70 hover:border-[#C8963E] hover:text-[#C8963E] transition-colors"
                aria-label="Next"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
