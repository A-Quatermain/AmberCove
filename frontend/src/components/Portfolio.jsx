import { Reveal, Overline } from "./motion";
import { PORTFOLIO } from "../data";
import { ArrowUpRight } from "lucide-react";

const PortfolioItem = ({ item, index }) => (
  <Reveal
    delay={(index % 2) * 0.08}
    className={item.span ? "sm:col-span-2" : "sm:col-span-1"}
  >
    <div
      data-testid={`portfolio-item-${index}`}
      className="group relative overflow-hidden cursor-pointer"
      style={{ height: item.span ? "clamp(360px,42vw,560px)" : "clamp(320px,32vw,440px)" }}
    >
      <img
        src={item.image}
        alt={item.title}
        className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

      <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
        <span className="translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 font-body text-[11px] uppercase tracking-[0.2em] text-[#C8963E] mb-3">
          {item.category}
        </span>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h3 className="font-serif text-2xl md:text-3xl text-[#F5F0E8]">{item.title}</h3>
            <p className="mt-1 font-body text-sm text-[#F5F0E8]/55">{item.location}</p>
          </div>
          <span className="shrink-0 h-11 w-11 rounded-full border border-[#C8963E]/40 flex items-center justify-center text-[#C8963E] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-500">
            <ArrowUpRight size={18} />
          </span>
        </div>
      </div>
    </div>
  </Reveal>
);

export const Portfolio = () => {
  return (
    <section
      id="portfolio"
      data-testid="portfolio-section"
      className="relative bg-[#0A0A0A] py-24 md:py-36"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <Reveal>
              <Overline>Selected Projects</Overline>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-serif font-light text-4xl md:text-5xl lg:text-6xl tracking-tight text-[#F5F0E8]">
                Our Portfolio
              </h2>
            </Reveal>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
          {PORTFOLIO.map((item, i) => (
            <PortfolioItem key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
