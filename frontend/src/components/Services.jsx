import { useState } from "react";
import { Reveal, Overline } from "./motion";
import { SERVICES } from "../data";

const ServiceCard = ({ s, index }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <Reveal delay={(index % 3) * 0.08}>
      <div
        data-testid={`service-card-${index}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group relative h-full overflow-hidden border border-white/[0.07] bg-[#121212] p-9 md:p-11 transition-colors duration-500 hover:border-[#C8963E]/40"
      >
        {/* Hover image bg */}
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: hovered ? 0.18 : 0 }}
        >
          <img src={s.image} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[#0A0A0A]/40" />
        </div>

        <div className="relative z-10">
          <div className="flex items-baseline justify-between">
            <span className="font-mono text-xs tracking-widest text-[#C8963E]/70">
              {s.num}
            </span>
            <span
              className="h-px bg-[#C8963E] transition-all duration-500"
              style={{ width: hovered ? "42px" : "18px" }}
            />
          </div>
          <h3 className="mt-8 font-serif text-2xl md:text-3xl leading-snug text-[#F5F0E8]">
            {s.title}
          </h3>
          <p className="mt-4 font-body text-sm md:text-[15px] leading-relaxed text-[#F5F0E8]/55">
            {s.description}
          </p>
        </div>
      </div>
    </Reveal>
  );
};

export const Services = () => {
  return (
    <section
      id="services"
      data-testid="services-section"
      className="relative bg-[#0A0A0A] py-24 md:py-36 border-t border-white/[0.06]"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <Reveal>
              <Overline>What We Create</Overline>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-serif font-light text-4xl md:text-5xl lg:text-6xl tracking-tight text-[#F5F0E8]">
                Our Services
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-sm font-body text-sm leading-relaxed text-[#F5F0E8]/50">
              Six disciplines, one uncompromising standard. Every element engineered
              for the South Florida climate and the way you live outdoors.
            </p>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06]">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.num} s={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
