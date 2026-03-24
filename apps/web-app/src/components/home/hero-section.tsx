import Image from "next/image";
import HERO_BANNER from "../../../public/header.webp";
import { Button } from "../ui/button";

const HeroSection = () => {
  return (
    <section className="relative w-full overflow-hidden mb-16">
      {/* ── BACKGROUND IMAGE ── */}
      <div className="animate-scaleIn absolute inset-0 w-full">
        <Image
          src={HERO_BANNER}
          alt="hero banner"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* ── OVERLAY (multi-layer for depth) ── */}
      {/* Teal gradient from bottom-left */}
      <div className="absolute inset-0 bg-linear-to-tr from-teal-950/80 via-slate-950/40 to-transparent" />
      {/* Top vignette */}
      <div className="absolute inset-0 bg-linear-to-b from-slate-950/30 via-transparent to-slate-950/70" />

      {/* ── CONTENT ── */}
      <div className="relative mx-auto max-w-6xl z-10 flex flex-col justify-center py-24 px-4">
        <div className="">
          {/* Badge */}
          <div className="animate-fadeUp-1 inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-accent bg-accent/90 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-white text-[10px] md:text-xs font-medium tracking-widest uppercase">
              Trusted by 50,000+ patients
            </span>
          </div>

          {/* Title */}
          <h1 className="font-playfair animate-fadeUp-2 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Your Health, <span className="italic text-[#D9EAFD]">Our Priority</span>
            <br className="hidden sm:block" />
            <span className="block mt-1">Book a Doctor</span>
            <span className="block">in Seconds.</span>
          </h1>

          {/* Description */}
          <p className="animate-fadeUp-3 text-white/80 text-base sm:text-lg leading-relaxed max-w-xl mb-10">
            Connect with certified specialists, schedule same-day appointments, and receive
            expert care — all from the comfort of your home or our state-of-the-art clinics.
          </p>

          {/* Action Buttons */}
          <div className="animate-fadeUp-4 flex flex-col sm:flex-row gap-4">
            {/* Primary CTA */}
            <Button variant="primary" size="lg">
              Book Appointment
            </Button>

            {/* Secondary CTA */}
            <Button
              variant="outline"
              size="lg"
              className="text-primary-foreground hover:text-primary-foreground"
            >
              Virtual Consult
            </Button>
          </div>

          {/* Stats row */}
          <div className="animate-fadeUp-4 mt-14 flex flex-wrap gap-x-10 gap-y-4">
            {[
              { value: "200+", label: "Specialists" },
              { value: "24/7", label: "Availability" },
              { value: "4.9★", label: "Patient Rating" },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col">
                <span className="font-playfair text-2xl font-bold text-white">{value}</span>
                <span className="text-white/80 text-xs tracking-wider uppercase mt-0.5">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
