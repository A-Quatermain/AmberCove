import { Instagram, Facebook, Linkedin } from "lucide-react";
import { NAV_LINKS, SERVICE_OPTIONS } from "../data";

export const Footer = ({ scrollTo }) => {
  return (
    <footer data-testid="footer" className="relative bg-[#0A0A0A] border-t border-white/[0.08] pt-20 pb-10">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-12 pb-16">
          <div className="md:col-span-5">
            <span className="font-serif text-3xl tracking-tight text-[#F5F0E8]">
              Amber<span className="text-[#C8963E]">Cove</span>
            </span>
            <p className="mt-6 max-w-sm font-body text-sm leading-relaxed text-[#F5F0E8]/50">
              A design-build studio crafting luxury outdoor living environments across
              South Florida's most coveted addresses.
            </p>
            <div className="mt-8 flex gap-3">
              {[
                { Icon: Instagram, label: "Instagram", href: "https://instagram.com/ambercove" },
                { Icon: Facebook, label: "Facebook", href: "#" },
                { Icon: Linkedin, label: "LinkedIn", href: "#" },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`footer-social-${label.toLowerCase()}`}
                  aria-label={label}
                  className="h-11 w-11 rounded-full border border-white/12 flex items-center justify-center text-[#F5F0E8]/60 hover:border-[#C8963E] hover:text-[#C8963E] transition-colors"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-body text-[11px] uppercase tracking-[0.2em] text-[#C8963E] mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {SERVICE_OPTIONS.slice(0, 6).map((s) => (
                <li key={s}>
                  <button
                    onClick={() => scrollTo("services")}
                    className="font-body text-sm text-[#F5F0E8]/55 hover:text-[#F5F0E8] transition-colors text-left"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-body text-[11px] uppercase tracking-[0.2em] text-[#C8963E] mb-6">
              Company
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => scrollTo(l.id)}
                    className="font-body text-sm text-[#F5F0E8]/55 hover:text-[#F5F0E8] transition-colors"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-body text-[11px] uppercase tracking-[0.2em] text-[#C8963E] mb-6">
              Visit
            </h4>
            <p className="font-body text-sm leading-relaxed text-[#F5F0E8]/55">
              Delray Beach, FL<br />
              (561) 555-0180<br />
              hello@ambercove.com
            </p>
          </div>
        </div>

        <div className="border-t border-white/[0.08] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-[#F5F0E8]/35">
            © {new Date().getFullYear()} Amber Cove Outdoor Living. All rights reserved.
          </p>
          <p className="font-body text-xs text-[#F5F0E8]/35">
            Designed for the South Florida lifestyle · ambercove.com
          </p>
        </div>
      </div>
    </footer>
  );
};
