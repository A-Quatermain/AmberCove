import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Reveal, Overline } from "./motion";
import { SERVICE_OPTIONS } from "../data";
import { MapPin, Phone, Mail, Clock, Loader2 } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const INFO = [
  { icon: MapPin, label: "Studio", value: "Delray Beach, Florida" },
  { icon: Phone, label: "Phone", value: "(561) 555-0180" },
  { icon: Mail, label: "Email", value: "hello@ambercove.com" },
  { icon: Clock, label: "Hours", value: "Mon–Fri 9–6 · Sat by appointment" },
];

export const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in your name, email, and a short message.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success("Thank you — your inquiry has been received. We'll be in touch shortly.");
      setForm({ name: "", email: "", phone: "", service: "", message: "" });
    } catch (err) {
      toast.error("Something went wrong. Please try again or email us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="relative bg-[#121212] py-24 md:py-36"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid lg:grid-cols-12 gap-14 lg:gap-20">
          {/* Left */}
          <div className="lg:col-span-5">
            <Reveal>
              <Overline>Start Your Project</Overline>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-7 font-serif font-light text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-[#F5F0E8]">
                Let's Create Something{" "}
                <span className="italic text-[#C8963E]">Extraordinary</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 font-body text-base leading-relaxed text-[#F5F0E8]/60 max-w-md">
                Whether you're envisioning a complete outdoor transformation or a single
                statement feature, we'd love to discuss your project. Complimentary design
                consultations available for qualifying properties throughout South Florida.
              </p>
            </Reveal>

            <div className="mt-12 grid grid-cols-2 gap-8">
              {INFO.map((item, idx) => (
                <Reveal key={item.label} delay={0.12 + idx * 0.05}>
                  <div className="flex gap-4">
                    <item.icon size={18} className="mt-1 text-[#C8963E] shrink-0" />
                    <div>
                      <div className="font-body text-[10px] uppercase tracking-[0.2em] text-[#F5F0E8]/40">
                        {item.label}
                      </div>
                      <div className="mt-1.5 font-body text-sm text-[#F5F0E8]/85">
                        {item.value}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <Reveal delay={0.1} y={50}>
              <form
                onSubmit={submit}
                data-testid="contact-form"
                className="border border-white/[0.08] bg-[#0A0A0A] p-8 md:p-12"
              >
                <div className="grid sm:grid-cols-2 gap-8">
                  <FloatingInput label="Full Name" testid="contact-name" value={form.name} onChange={set("name")} />
                  <FloatingInput label="Email Address" testid="contact-email" type="email" value={form.email} onChange={set("email")} />
                  <FloatingInput label="Phone Number" testid="contact-phone" type="tel" value={form.phone} onChange={set("phone")} />
                  <div className="relative">
                    <select
                      data-testid="contact-service"
                      value={form.service}
                      onChange={set("service")}
                      className="peer w-full bg-transparent border-b border-[#C8963E]/25 py-3 font-body text-[15px] text-[#F5F0E8] outline-none focus:border-[#C8963E] transition-colors appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-[#0A0A0A]">Select Service Interest</option>
                      {SERVICE_OPTIONS.map((o) => (
                        <option key={o} value={o} className="bg-[#0A0A0A]">{o}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-8">
                  <textarea
                    data-testid="contact-message"
                    rows={4}
                    placeholder="Tell us about your project..."
                    value={form.message}
                    onChange={set("message")}
                    className="w-full bg-transparent border-b border-[#C8963E]/25 py-3 font-body text-[15px] text-[#F5F0E8] placeholder:text-[#F5F0E8]/35 outline-none focus:border-[#C8963E] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  data-testid="contact-submit"
                  disabled={loading}
                  className="mt-10 inline-flex items-center gap-3 bg-[#C8963E] px-10 py-4 text-[#0A0A0A] font-body text-[12px] font-semibold uppercase tracking-[0.2em] hover:bg-[#E0AE52] transition-colors duration-300 disabled:opacity-60"
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : null}
                  {loading ? "Sending" : "Send Inquiry"}
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

const FloatingInput = ({ label, testid, type = "text", value, onChange }) => (
  <div className="relative">
    <input
      data-testid={testid}
      type={type}
      placeholder={label}
      value={value}
      onChange={onChange}
      className="peer w-full bg-transparent border-b border-[#C8963E]/25 py-3 font-body text-[15px] text-[#F5F0E8] placeholder:text-[#F5F0E8]/35 outline-none focus:border-[#C8963E] transition-colors"
    />
  </div>
);
