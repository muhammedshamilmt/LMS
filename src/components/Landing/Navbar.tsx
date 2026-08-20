import Link from "next/link";
import { AnimatedLink } from "@/components/ui/AnimatedButton";

const NavItem = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <Link href={href} className="relative overflow-hidden group block h-[24px]">
      <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-1/2">
        <span className="h-[24px] flex items-center text-[15px] text-gray-300 font-medium">
          {children}
        </span>
        <span className="h-[24px] flex items-center text-[15px] text-white font-medium">
          {children}
        </span>
      </div>
    </Link>
  );
};

export function Navbar() {
  return (
    <header className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
      <div className="bg-[#050505]/40 backdrop-blur-2xl border border-white/10 rounded-2xl px-6 py-3 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.4)]">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.3)]">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-600 via-transparent to-orange-500 opacity-80" />
            <div className="absolute inset-[2.5px] bg-[#050505] rounded-full shadow-[inset_-2px_-2px_10px_rgba(59,130,246,0.4)]" />
          </div>
          <span className="text-xl font-semibold tracking-tight text-white">HG Healing</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 ml-auto mr-12">
          <NavItem href="#">About us</NavItem>
          <NavItem href="#">Pricing</NavItem>
          <NavItem href="#">Integration</NavItem>
          <NavItem href="#">Blog</NavItem>
          <NavItem href="#">Contact</NavItem>
          <NavItem href="#">Waitlist</NavItem>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-6">
          <Link href="/login" className="text-[15px] font-medium text-white/80 hover:text-white transition-colors">
            Log in
          </Link>
          <AnimatedLink
            href="/start"
            text="Get Started"
            className="relative px-6 py-2.5 rounded-xl bg-[#0a0a0a] text-white text-[15px] font-medium border border-white/15 hover:border-blue-500/50 transition-all duration-500 group overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)]"
          />
        </div>

      </div>
    </header>
  );
}
