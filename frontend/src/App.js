import { useEffect, useState, useRef } from "react";
import Lenis from "lenis";
import { Toaster } from "sonner";
import "@/App.css";

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { StatsDivider } from "@/components/StatsDivider";
import { Portfolio } from "@/components/Portfolio";
import { Process } from "@/components/Process";
import { Testimonials } from "@/components/Testimonials";
import { ServiceAreas } from "@/components/ServiceAreas";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const SECTIONS = ["home", "about", "services", "portfolio", "testimonials", "contact"];

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    let raf;
    const raf_loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(raf_loop);
    };
    raf = requestAnimationFrame(raf_loop);

    const onScroll = () => {
      const y = window.scrollY;
      for (const id of [...SECTIONS].reverse()) {
        const el = document.getElementById(id);
        if (el && y >= el.offsetTop - 220) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el && lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: -10 });
    } else if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="App grain bg-[#0A0A0A]">
      <Toaster
        position="top-center"
        theme="dark"
        toastOptions={{
          style: {
            background: "#141414",
            border: "1px solid rgba(200,150,62,0.3)",
            color: "#F5F0E8",
          },
        }}
      />
      <Navbar activeSection={activeSection} scrollTo={scrollTo} />
      <main>
        <Hero scrollTo={scrollTo} />
        <About />
        <Services />
        <StatsDivider />
        <Portfolio />
        <Process />
        <Testimonials />
        <ServiceAreas />
        <Contact />
      </main>
      <Footer scrollTo={scrollTo} />
    </div>
  );
}

export default App;
