import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { STATS } from "../data";

const Counter = ({ target, suffix }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    let start;
    const duration = 1900;
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * target));
      if (p < 1) raf = requestAnimationFrame(step);
      else setCount(target);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <span ref={ref} className="font-serif text-6xl md:text-7xl lg:text-8xl text-[#F5F0E8] leading-none">
      {count}
      <span className="text-[#C8963E]">{suffix}</span>
    </span>
  );
};

export const StatsDivider = () => {
  return (
    <section
      data-testid="stats-divider"
      className="relative bg-[#121212] py-20 md:py-28 border-y border-white/[0.06]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(200,150,62,0.08),transparent_70%)]" />
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-14 gap-x-8">
          {STATS.map((s) => (
            <div key={s.label} className="text-center lg:text-left" data-testid={`stat-${s.label}`}>
              <Counter target={s.number} suffix={s.suffix} />
              <div className="mt-4 font-body text-[11px] md:text-xs uppercase tracking-[0.22em] text-[#F5F0E8]/45">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
