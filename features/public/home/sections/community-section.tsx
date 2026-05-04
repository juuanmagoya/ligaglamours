// components/CommunitySection.tsx
import Link from "next/link";
import { FaWhatsapp, FaBolt, FaHeart, FaStar, FaCheck, FaArrowRight, FaShieldAlt } from "react-icons/fa";

export function CommunitySection() {
  return (
    <section id="comunidad" className="py-20 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Card Principal */}
          <div className="group relative overflow-hidden rounded-3xl bg-[#1a1029]/50 p-8 backdrop-blur md:p-12">
            
            {/* Elementos decorativos con efecto hover */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-linear-to-r from-green-500/20 to-green-600/20 blur-3xl transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-linear-to-r from-purple-500/20 to-pink-500/20 blur-3xl transition-transform duration-700 group-hover:scale-110" />
            
            {/* Patrón de fondo sutil */}
            <div className="absolute inset-0 opacity-5">
              <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <pattern id="grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
                <rect x="0" y="0" width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
            
            <div className="relative z-10">
              {/* Badge "COMUNIDAD ACTIVA" animado */}
              <div className="mb-6 flex justify-center">
                <div className="inline-flex animate-pulse items-center gap-2 bg-linear-to-r from-green-500 to-green-600 px-4 py-2 rounded-full">
                  <FaBolt className="text-white text-xs" />
                  <span className="text-white text-xs font-bold tracking-wider">COMUNIDAD ACTIVA</span>
                  <FaBolt className="text-white text-xs" />
                </div>
              </div>
              
              <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-12">
                {/* Columna Izquierda - Icono/Ilustración */}
                <div className="lg:w-1/3 flex justify-center">
                  <div className="relative">
                    {/* Círculo animado detrás del ícono */}
                    <div className="absolute inset-0 animate-pulse rounded-full bg-linear-to-r from-green-500 to-purple-500 opacity-50 blur-xl"></div>
                    
                    {/* Icono principal de WhatsApp */}
                    <div className="relative flex h-40 w-40 rotate-12 items-center justify-center rounded-3xl bg-linear -to-br from-green-500 to-green-600 shadow-2xl transition-all duration-500 hover:rotate-0 md:h-48 md:w-48">
                      <FaWhatsapp className="text-white text-7xl md:text-8xl" />
                      
                      {/* Iconos flotantes decorativos */}
                      <div className="absolute -right-4 -top-4 flex h-12 w-12 animate-bounce items-center justify-center rounded-2xl bg-purple-500" style={{ animationDelay: "0.2s" }}>
                        <FaHeart className="text-white text-xl" />
                      </div>
                      <div className="absolute -bottom-4 -left-4 flex h-10 w-10 animate-bounce items-center justify-center rounded-2xl bg-pink-500" style={{ animationDelay: "0.4s" }}>
                        <FaStar className="text-white text-lg" />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Columna Derecha - Texto y Botón */}
                <div className="lg:w-2/3 text-center lg:text-left">
                  <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
                    <span className="bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Únete a la</span>
                    <span className="text-white"> Comunidad</span>
                  </h2>
                  
                  <h3 className="mb-4 text-2xl font-bold text-green-400 md:text-3xl">
                    Liga Glamour <FaWhatsapp className="ml-2 inline" />
                  </h3>
                  
                  <p className="mx-auto mb-6 max-w-xl text-white/70 text-lg lg:mx-0">
                    Sé parte del grupo oficial de WhatsApp donde más de <span className="font-bold text-green-400">400+</span> miembros comparten su pasión por Mobile Legends. 
                    <span className="mt-2 block text-white/80">¡Enterate de todas las novedades, partidos y eventos exclusivos!</span>
                  </p>
                  
                  {/* Features list */}
                  <div className="mx-auto mb-8 grid max-w-lg grid-cols-2 gap-3 lg:mx-0">
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/20">
                        <FaCheck className="text-green-400 text-xs" />
                      </div>
                      <span className="text-white/80 text-sm">Partidos en vivo</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/20">
                        <FaCheck className="text-green-400 text-xs" />
                      </div>
                      <span className="text-white/80 text-sm">Noticias exclusivas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/20">
                        <FaCheck className="text-green-400 text-xs" />
                      </div>
                      <span className="text-white/80 text-sm">Sorteos y eventos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/20">
                        <FaCheck className="text-green-400 text-xs" />
                      </div>
                      <span className="text-white/80 text-sm">Comunidad activa</span>
                    </div>
                  </div>
                  
                  {/* Botón de WhatsApp con efectos */}
                  <div className="relative inline-block">
                    <Link
                      href="https://chat.whatsapp.com/BDzM45V46sD2D9KiFGth6V?mode=gt_i"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-linear-to-r from-green-500 to-green-600 px-8 py-5 text-lg font-bold text-white transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-green-500/30"
                    >
                      {/* Efecto de onda al hover */}
                      <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-700 group-hover/btn:translate-x-0" />
                      
                      <FaWhatsapp className="relative z-10 text-2xl" />
                      <span className="relative z-10">Unirme al grupo oficial</span>
                      <FaArrowRight className="relative z-10 transition-transform group-hover/btn:translate-x-2" />
                      
                      {/* Badge de miembros online */}
                      <span className="absolute -right-2 -top-2 animate-pulse rounded-full bg-red-500 px-2 py-1 text-xs text-white">
                        200+ online
                      </span>
                    </Link>
                  </div>
                  
                  {/* Texto de privacidad */}
                  <p className="mt-4 text-white/40 text-xs">
                    <FaShieldAlt className="mr-1 inline" />
                    Tu número está seguro. No compartimos información con terceros.
                  </p>
                </div>
              </div>
              
              {/* Stats de miembros */}
              <div className="mt-12 grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    400+
                  </div>
                  <div className="text-white/50 text-xs">Miembros activos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    200+
                  </div>
                  <div className="text-white/50 text-xs">Online ahora</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    24/7
                  </div>
                  <div className="text-white/50 text-xs">Conversación activa</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}