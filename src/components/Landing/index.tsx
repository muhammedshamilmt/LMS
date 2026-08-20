import { Inter } from "next/font/google";
import Image from "next/image";
import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { DashboardPlaceholder } from "./DashboardPlaceholder";
import { TrustedBy } from "./TrustedBy";
import { Features } from "./Features";
import { Services } from "./Services";
import { KeyTools } from "./KeyTools";
import { Courses } from "./Courses";
import { Pricing } from "./Pricing";
import { Testimonials } from "./Testimonials";
import { Faq } from "./Faq";
import { CTASection } from "./CTA";
import { Footer } from "./Footer";
import { Faculties } from "./Faculties";
import { Subjects } from "./Subjects";
import CustomCursor from "./CustomCursor";

const inter = Inter({ subsets: ["latin"] });

export default function Landing() {
  return (
    <div className={`min-h-screen bg-black text-white selection:bg-blue-500/30 relative ${inter.className} font-medium`}>
      <CustomCursor />
      {/* Background Image */}
      <div className="absolute top-0 left-0 w-full h-[800px] pointer-events-none z-0">
        <Image
          src="/assests/hero.png"
          alt="Hero Background"
          fill
          className="object-cover object-top opacity-80"
          style={{ maskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)' }}
          priority
        />
      </div>

      {/* Vertical Container Lines */}
      <div className="absolute inset-0 pointer-events-none flex justify-center z-30">
        <div className="w-full max-w-7xl h-full border-x border-white/[0.06]" />
      </div>

      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] opacity-40 pointer-events-none">
        <div className="absolute inset-0 bg-blue-600 blur-[150px] rounded-full mix-blend-screen" />
      </div>

      {/* Grid pattern overlay (optional for extra detail) */}
      {/* <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" /> */}


      <Navbar />

      {/* Main Content */}
      <main className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
        <div className="min-h-[50vh] w-full flex flex-col items-center justify-center pt-32 ">
          <Hero />
        </div>
        <div className="h-[85vh] w-full">
          <DashboardPlaceholder />
        </div>
        <TrustedBy />
        <Features />
        <KeyTools />
        <Courses />
        <Faculties />
        <Subjects />
        <Services />
        {/* <Pricing /> */}
        <Testimonials />
        <Faq />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
