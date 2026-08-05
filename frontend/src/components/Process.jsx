import { Reveal, Overline } from "./motion";
import { PROCESS } from "../data";

export const Process = () => {
  return (
    <section
      id="process"
      data-testid="process-section"
      className="relative bg-[#121212] py-24 md:py-36 border-y border-white/[0.06]"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-16">
          <Reveal>
            <Overline>How We Work</Overline>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-serif font-light text-4xl md:text-5xl lg:text-6xl tracking-tight text-[#F5F0E8]">
              A Process Without Compromise
            </h2>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-4 gap-y-12 md:gap-x-8">
          {PROCESS.map((p, i) => (
            <Reveal key={p.step} delay={i * 0.1}>
              <div className="relative md:pr-6" data-testid={`process-step-${i}`}>
                {i < PROCESS.length - 1 && (
                  <div className="hidden md:block absolute top-5 left-16 right-0 h-px bg-gradient-to-r from-[#C8963E]/40 to-transparent" />
                )}
                <div className="flex items-center gap-4">
                  <span className="font-serif text-5xl text-[#C8963E]/25 leading-none">
                    {p.step}
                  </span>
                  <span className="h-2.5 w-2.5 rounded-full bg-[#C8963E]" />
                </div>
                <h3 className="mt-7 font-serif text-2xl md:text-3xl text-[#F5F0E8]">
                  {p.title}
                </h3>
                <p className="mt-4 font-body text-sm leading-relaxed text-[#F5F0E8]/55 max-w-[240px]">
                  {p.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
