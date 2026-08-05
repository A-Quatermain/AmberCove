import { AREAS } from "../data";

export const ServiceAreas = () => {
  const loop = [...AREAS, ...AREAS];
  return (
    <section
      data-testid="service-areas"
      className="relative bg-[#0A0A0A] py-16 md:py-24 border-y border-white/[0.06] overflow-hidden"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 mb-10">
        <span className="inline-flex items-center gap-3 font-body text-[11px] uppercase tracking-[0.3em] text-[#C8963E]">
          <span className="h-px w-8 bg-[#C8963E]/60" />
          Proudly Serving South Florida
        </span>
      </div>

      <div className="marquee-mask">
        <div className="flex w-max animate-marquee items-center">
          {loop.map((area, i) => (
            <div key={i} className="flex items-center">
              <span className="font-serif text-5xl md:text-7xl text-outline px-8 hover:text-[#C8963E] transition-colors duration-300">
                {area}
              </span>
              <span className="text-[#C8963E] text-3xl">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
