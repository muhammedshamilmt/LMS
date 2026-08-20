import { ScrollReveal } from "./ScrollReveal";

export function TrustedBy() {
  const logos = [
    { name: "Fluxenta", icon: "✹" },
    { name: "Veltriq", icon: "⎔" },
    { name: "Fyntra", icon: "∾" },
    { name: "Nexora", icon: "◎" },
    { name: "Proline", icon: "❖" },
    { name: "Astra", icon: "✧" },
  ];

  // We multiply the array to ensure it's long enough to fill ultra-wide screens
  const marqueeLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <section className="w-full py-10 pb-24 mt-36 border-t border-b border-white/[0.10] relative overflow-hidden flex flex-col items-center">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>

      <ScrollReveal delay={0.1}>
        <p className="text-gray-400 text-sm font-medium mb-12">
          Trusted by 17,000+ founders & business owners
        </p>
      </ScrollReveal>

      {/* Marquee Container */}
      <div className="w-full overflow-hidden relative flex">
        {/* Fade Gradients for edges */}
        <div className="absolute top-0 left-0 w-32 md:w-64 h-full bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 md:w-64 h-full bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />

        {/* Marquee Track */}
        <div className="flex animate-marquee min-w-max hover:[animation-play-state:paused]">
          {marqueeLogos.map((logo, index) => (
            <div
              key={index}
              className="flex items-center gap-2.5 mx-12 text-white/60 hover:text-white transition-colors duration-300 cursor-pointer grayscale hover:grayscale-0"
            >
              <span className="text-2xl text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]">{logo.icon}</span>
              <span className="text-[22px] font-bold tracking-tight">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
