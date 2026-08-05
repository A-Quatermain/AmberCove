import { Reveal, Overline } from "./motion";
import { IMAGES } from "../data";

export const About = () => {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="relative bg-[#0A0A0A] py-24 md:py-36"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid lg:grid-cols-12 gap-14 lg:gap-20 items-center">
          {/* Copy */}
          <div className="lg:col-span-6">
            <Reveal>
              <Overline>Our Philosophy</Overline>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-7 font-serif font-light text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-[#F5F0E8]">
                Crafted for the Way{" "}
                <span className="italic text-[#C8963E]">South Florida</span> Lives
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 font-body text-base md:text-lg leading-relaxed text-[#F5F0E8]/65 max-w-xl">
                Amber Cove is a design-build studio specializing in luxury outdoor
                living environments. From waterfront estates in Boca Raton to modern
                residences in Aventura, we partner with homeowners, architects, and
                builders to create exterior spaces that rival the finest interiors.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-5 font-body text-base leading-relaxed text-[#F5F0E8]/50 max-w-xl">
                Every project begins with listening — understanding how our clients
                live, entertain, and connect with the outdoors. The result is never
                just a kitchen or a pergola. It's a destination.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
                {[
                  { n: "15+", l: "Years Experience" },
                  { n: "400+", l: "Projects" },
                  { n: "98%", l: "Satisfaction" },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="font-serif text-4xl md:text-5xl text-[#C8963E] leading-none">
                      {s.n}
                    </div>
                    <div className="mt-2 font-body text-[11px] uppercase tracking-[0.18em] text-[#F5F0E8]/45">
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Image + floating card */}
          <div className="lg:col-span-6 relative">
            <Reveal delay={0.1} y={60}>
              <div className="relative overflow-hidden">
                <img
                  src={IMAGES.about}
                  alt="Amber Cove outdoor living space"
                  className="w-full h-[440px] md:h-[560px] object-cover"
                  data-testid="about-image"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
              </div>
            </Reveal>
            <Reveal delay={0.35} y={30}>
              <div className="absolute -bottom-8 -left-4 md:-left-10 max-w-xs bg-[#141414] border border-[#C8963E]/30 p-8 shadow-2xl">
                <div className="font-serif text-5xl text-[#C8963E]/30 leading-none">"</div>
                <p className="font-serif italic text-xl md:text-2xl leading-snug text-[#F5F0E8] -mt-3">
                  Design is the art of making outdoor spaces feel like home.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
