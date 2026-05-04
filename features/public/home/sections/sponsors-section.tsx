"use client";

import { 
  Trophy, 
  Star, 
  Users, 
  Target, 
  Award,
  ChevronRight,
  Sparkles,
  Heart,
  Gem
} from "lucide-react";

export function SponsorsSection() {
  // ✅ Eliminado useState y useEffect - no son necesarios

  // Beneficios para sponsors
  const benefits = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Visibilidad Masiva",
      description: "Tu marca frente a miles de jugadores y fans apasionados de Mobile Legends"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Público Objetivo",
      description: "Conectá directamente con la comunidad gamer más activa de Argentina"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Branding Premium",
      description: "Logos en transmisiones, redes sociales y eventos en vivo"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Fidelización",
      description: "Asociá tu marca con los valores del deporte electrónico"
    }
  ];

  return (
    <section id="sponsors" className="py-24 relative overflow-hidden">
      {/* Fondos decorativos oscuros */}
      <div className="absolute inset-0 bg-linear-to-b from-purple-900/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header - Animación directa con CSS */}
        <div className="text-center max-w-4xl mx-auto mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-semibold text-purple-300">OPORTUNIDAD ÚNICA</span>
            <Gem className="w-4 h-4 text-cyan-400" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-purple-400">Sponsors</span>
            <span className="text-white"> y Partners</span>
          </h2>

          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            ¿Querés que tu marca sea parte de la liga de esports más importante de Argentina?
          </p>
        </div>

        {/* Estadísticas de impacto - estilo dark */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
          <div className="bg-[#1a1029]/50 backdrop-blur rounded-2xl p-6 text-center border border-purple-500/20 group hover:border-purple-500/40 transition-all duration-300">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
              <Users className="w-8 h-8 text-purple-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">400+</div>
            <div className="text-white/50 text-sm">Jugadores activos</div>
            <div className="text-white/30 text-xs mt-2">En toda la liga</div>
          </div>

          <div className="bg-[#1a1029]/50 backdrop-blur rounded-2xl p-6 text-center border border-purple-500/20 group hover:border-purple-500/40 transition-all duration-300">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
              <Trophy className="w-8 h-8 text-cyan-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">4</div>
            <div className="text-white/50 text-sm">Divisiones</div>
            <div className="text-white/30 text-xs mt-2">Competitivas</div>
          </div>

          <div className="bg-[#1a1029]/50 backdrop-blur rounded-2xl p-6 text-center border border-purple-500/20 group hover:border-purple-500/40 transition-all duration-300">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-500/10 flex items-center justify-center group-hover:bg-yellow-500/20 transition-colors">
              <Star className="w-8 h-8 text-yellow-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">24/7</div>
            <div className="text-white/50 text-sm">Comunidad activa</div>
            <div className="text-white/30 text-xs mt-2">En WhatsApp y Discord</div>
          </div>
        </div>

        {/* Beneficios para sponsors */}
        <div className="mb-20 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              <span className="text-white">¿Por qué ser </span>
              <span className="text-purple-400">sponsor?</span>
            </h3>
            <p className="text-white/50 max-w-2xl mx-auto">
              Beneficios exclusivos para tu marca en el ecosistema de esports
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group bg-[#1a1029]/50 backdrop-blur rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all hover:-translate-y-2"
              >
                <div className="w-12 h-12 mb-4 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/20 group-hover:scale-110 transition-all">
                  {benefit.icon}
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{benefit.title}</h4>
                <p className="text-white/50 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA principal - Invitación a sponsors (estilo dark) */}
        <div className="max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: "400ms" }}>
          <div className="relative group">
            {/* Efecto glow sutil */}
            <div className="absolute -inset-0.5 bg-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />
            
            <div className="relative overflow-hidden rounded-3xl bg-[#1a1029]/80 backdrop-blur border border-purple-500/20 p-8 md:p-12 text-center">
              {/* Elementos decorativos sutiles */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/5 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-2xl" />

              <div className="relative z-10">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span className="text-purple-300 text-xs font-bold tracking-wider">CONTACTO DIRECTO</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  <span className="text-white">¿Querés ser </span>
                  <span className="text-purple-400">sponsor?</span>
                </h3>

                <p className="text-white/60 text-base mb-6 max-w-md mx-auto">
                  Unite a nuestra lista de sponsors y conectá tu marca con la comunidad gamer más apasionada.
                </p>

                {/* Botón de contacto */}
                <a
                  href="https://wa.me/5491158577736"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition-all transform hover:-translate-y-0.5"
                >
                  <span>Contactar por WhatsApp</span>
                  <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </a>

                <p className="text-white/30 text-xs mt-4">
                  Te responderemos a la brevedad
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Estilos de animación */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
}