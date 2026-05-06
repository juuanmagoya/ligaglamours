"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Crown, ChevronRight } from "lucide-react";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";

  // 🔥 Links dinámicos según página
  const navLinks = [
    { label: "Inicio", href: "/" },

    // SOLO HOME
    ...(isHome
      ? [
          { label: "Información", href: "#about" },
          { label: "Campeones", href: "#champions" },
          { label: "Sponsors", href: "#sponsors" },
        ]
      : []),

    // SIEMPRE visibles
    { label: "Divisiones", href: "/divisiones" },
    { label: "Equipos", href: "/equipos" },
  ];

  // Detectar scroll SOLO en home
  useEffect(() => {
    if (!isHome) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = document.querySelectorAll<HTMLElement>("section[id]");
      const scrollY = window.scrollY;

      if (scrollY < 200) {
        setActiveSection("");
      }

      sections.forEach((section) => {
        const top = section.offsetTop - 120;
        const height = section.offsetHeight;
        const id = section.getAttribute("id");

        if (scrollY >= top && scrollY < top + height) {
          setActiveSection(`#${id}`);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" && activeSection === "";
    if (href.startsWith("#")) return activeSection === href;
    return pathname.startsWith(href);
  };

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#") && isHome) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        const offsetTop =
          element.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: offsetTop, behavior: "smooth" });
        setOpen(false);
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0a0615]/95 backdrop-blur-xl border-b border-purple-500/20 shadow-2xl shadow-purple-500/5"
          : "bg-[#0a0615]/50 backdrop-blur-md border-b border-purple-500/10"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center h-20">
          
          {/* LOGO */}
          <Link
            href="/"
            className="group relative flex items-center gap-3 transition-all duration-300 hover:scale-105"
          >
            <div className="absolute -inset-2 bg-linear-to-r from-purple-500/20 to-cyan-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-purple-500 via-pink-500 to-cyan-400 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                <Crown className="text-white w-6 h-6" />
              </div>
              <div className="absolute inset-0 rounded-xl bg-linear-to-br from-purple-500 to-cyan-400 opacity-0 group-hover:opacity-40 blur-lg transition-opacity duration-500 animate-pulse" />
            </div>

            <div className="flex flex-col">
              <span className="text-2xl font-bold leading-tight">
                <span className="bg-linear-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  Liga
                </span>
                <span className="text-white"> Glamour</span>
              </span>
              <span className="text-[10px] text-white/40 tracking-wider font-mono">
                GAMING COMPETITIVO
              </span>
            </div>
          </Link>

          {/* DESKTOP */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className={`relative px-4 lg:px-5 py-2 rounded-xl text-sm lg:text-base font-medium transition-all duration-300 group ${
                  isActive(link.href)
                    ? "text-cyan-400"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <span className="relative z-10">{link.label}</span>

                <span
                  className={`absolute left-1/2 -translate-x-1/2 bottom-0 h-2px rounded-full
                    bg-linear-to-r from-cyan-400 via-purple-500 to-pink-500
                    transition-all duration-500
                    ${
                      isActive(link.href)
                        ? "w-[80%] opacity-100"
                        : "w-0 opacity-0 group-hover:w-[80%] group-hover:opacity-100"
                    }`}
                />
              </Link>
            ))}
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10"
          >
            {open ? (
              <X className="text-white w-5 h-5" />
            ) : (
              <Menu className="text-white w-5 h-5" />
            )}
          </button>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            open ? "max-h-500px opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4">
            <div className="rounded-2xl p-2 space-y-1 bg-[#120b1f]/95 border border-purple-500/20">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    handleSmoothScroll(e, link.href);
                    setOpen(false);
                  }}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl ${
                    isActive(link.href)
                      ? "bg-purple-500/20 text-white"
                      : "text-white/70 hover:bg-white/5"
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive(link.href) && (
                    <ChevronRight className="w-4 h-4 text-cyan-400" />
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}