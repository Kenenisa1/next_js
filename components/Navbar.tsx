'use client';
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/photo.jpg";

const naveLinks = [
  { name: "home" , href: "/"},
  { name: "about" , href: "/about"},
  { name: "contact" , href: "/contact"}
]


const Navbar = () => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href");
    if (href) {
      const targetId = href.replace("#", "");
      const elem = document.getElementById(targetId);
      elem?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="fixed top-0 w-full z-50 transition-all duration-300">
      <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4">
        <nav className="relative flex items-center justify-between bg-slate-950/80 backdrop-blur-3xl border border-white/10 rounded-[28px] px-6 py-3 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.85)]">
          <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(129,140,248,0.06),transparent_35%)]" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            <div className="absolute h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.22),transparent_54%)] blur-3xl" />
            <div className="absolute h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.3),rgba(59,130,246,0.04),transparent_65%)] blur-2xl" />
          </div>
          {/* Logo Section */}
          <Link
            href="/"
            className="relative flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <div className="overflow-hidden rounded-lg border border-white/10 bg-white/5 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
              <Image
                src={logo}
                alt="Event Logo"
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <span className="font-bold text-xl tracking-tight text-white hidden sm:block">
              AMU Tech Hub
            </span>
          </Link>

          {/* Navigation Links */}
          {naveLinks.length > 0 && (
            <ul className="flex items-center gap-8">
              {naveLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-zinc-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {/* Call to Action Button */}
          <div className="hidden md:block">
            <a
              href="#events"
              onClick={handleScroll}
              className="bg-linear-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white px-5 py-2 rounded-2xl text-sm font-semibold shadow-[0_16px_50px_-24px_rgba(99,102,241,0.9)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_24px_80px_-30px_rgba(99,102,241,0.8)] active:scale-95 inline-block"
            >
              Explore Events
            </a>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
