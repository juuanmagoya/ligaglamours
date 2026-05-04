"use client";

import Link from "next/link";
import { 
  Crown, 
  Heart,
  Mail,
  MapPin,
  ChevronRight,
  Shield,
  Trophy
} from "lucide-react";

// ✅ Iconos definidos FUERA del componente (como variables JSX, no como componentes)
const InstagramIcon = (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const YoutubeIcon = (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505a3.017 3.017 0 0 0-2.122 2.136A31.63 31.63 0 0 0 0 12a31.63 31.63 0 0 0 .501 5.814 3.016 3.016 0 0 0 2.122 2.136c1.872.505 9.377.505 9.377.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136A31.63 31.63 0 0 0 24 12a31.63 31.63 0 0 0-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const TikTokIcon = (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: InstagramIcon,
      href: "https://www.instagram.com/glamour.ml.oficial",
      label: "Instagram",
      color: "hover:bg-pink-500/20"
    },
    {
      icon: YoutubeIcon,
      href: "https://youtube.com/@glamour.ml.oficial",
      label: "YouTube",
      color: "hover:bg-red-500/20"
    },
    {
      icon: TikTokIcon,
      href: "https://www.tiktok.com/@liga.glamour",
      label: "TikTok",
      color: "hover:bg-black/20"
    }
  ];

  const navLinks = [
    { label: "Inicio", href: "/", isLink: true },
    { label: "Información", href: "#about", isLink: false },
    { label: "Campeones", href: "#champions", isLink: false },
    { label: "Divisiones", href: "/divisiones", isLink: true }
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        const offsetTop = element.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: offsetTop, behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="relative mt-20 bg-[#0a0615]/95 backdrop-blur border-t border-purple-500/20 overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-purple-500/5 to-transparent pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 py-12 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          
          {/* Brand - Columna 1 */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-purple-500 rounded-xl blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                <div className="relative w-12 h-12 bg-linear-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg transition-all group-hover:scale-110">
                  <Crown className="text-white w-6 h-6" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-bold">
                  <span className="bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Liga
                  </span>
                  <span className="text-white"> Glamour</span>
                </span>
                <p className="text-white/40 text-xs font-mono">COMPETITIVE GAMING</p>
              </div>
            </div>

            <p className="text-white/60 text-sm leading-relaxed">
              La competición de élite de Mobile Legends en Argentina. Forjando campeones y creando leyendas en cada temporada.
            </p>

            {/* Redes Sociales */}
            <div className="flex gap-2 pt-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 ${social.color} transition-all duration-300 hover:-translate-y-1`}
                  aria-label={social.label}
                >
                  <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity" />
                  <div className="relative z-10 text-white">
                    {social.icon}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Navegación - Columna 2 */}
          <div>
            <h4 className="text-lg font-bold mb-5 text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-400" />
              Navegación
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link, index) => (
                <li key={index}>
                  {link.isLink ? (
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors"
                    >
                      <ChevronRight className="w-3 h-3 text-purple-400 group-hover:translate-x-1 transition-transform" />
                      <span>{link.label}</span>
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      onClick={(e) => handleSmoothScroll(e, link.href)}
                      className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-3 h-3 text-purple-400 group-hover:translate-x-1 transition-transform" />
                      <span>{link.label}</span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto - Columna 3 */}
          <div>
            <h4 className="text-lg font-bold mb-5 text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-cyan-400" />
              Contacto
            </h4>
            <div className="space-y-4">
              <p className="text-white/60 text-sm leading-relaxed">
                ¿Querés colaborar, sponsorear o formar parte de la liga?
              </p>
              
              <a
                href="https://wa.me/5491158577736"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition-all transform hover:-translate-y-0.5 overflow-hidden"
              >
                <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                <span className="relative z-10">Contactar ahora</span>
                <ChevronRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Info adicional - Columna 4 */}
          <div>
            <h4 className="text-lg font-bold mb-5 text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              Temporada Actual
            </h4>
            <div className="space-y-3">
              <div className="bg-purple-500/10 rounded-xl p-3 border border-purple-500/20">
                <p className="text-white/80 text-sm font-semibold">2026 - Temporada 9</p>
                <p className="text-white/40 text-xs mt-1">En curso · 4 divisiones activas</p>
              </div>
              <div className="flex items-center gap-2 text-white/40 text-xs">
                <MapPin className="w-3 h-3" />
                <span>Argentina · Competitivo</span>
              </div>
              <div className="flex items-center gap-2 text-white/40 text-xs">
                <Heart className="w-3 h-3 text-red-400" />
                <span>Comunidad +400 miembros</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-xs">
              © {currentYear} Liga Glamour. Todos los derechos reservados.
            </p>
            

            {/* Scroll to top button */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group flex items-center gap-1 text-white/40 hover:text-white transition-colors text-xs"
            >
              <ChevronRight className="w-3 h-3 rotate-[-90deg] group-hover:-translate-y-0.5 transition-transform" />
              Volver arriba
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}