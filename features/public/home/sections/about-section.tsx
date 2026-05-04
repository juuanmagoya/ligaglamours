export function AboutSection() {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-purple-400">Sobre la</span>
            <span className="text-white"> Liga</span>
          </h2>

          <p className="text-lg text-white/70">
            La Liga Glamour es la máxima expresión de los esports de Mobile Legends en Argentina,
            donde la pasión, la estrategia y el talento se encuentran para crear espectáculo.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">

          {/* Card 1 */}
          <div className="bg-[#1a1029]/50 backdrop-blur rounded-3xl p-8 border border-purple-500/10 hover:border-cyan-400/30 transition hover:-translate-y-2">
            <div className="w-16 h-16 rounded-2xl bg-linear-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-6">
              🏆
            </div>

            <h3 className="text-2xl font-bold mb-4">
              Competencia Élite
            </h3>

            <p className="text-white/60">
              Solo los equipos más fuertes llegan a esta arena. En cada enfrentamiento se pone a prueba
              la estrategia, la precisión y el verdadero nivel competitivo.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#1a1029]/50 backdrop-blur rounded-3xl p-8 border border-purple-500/10 hover:border-cyan-400/30 transition hover:-translate-y-2">
            <div className="w-16 h-16 rounded-2xl bg-linear-to-r from-cyan-400 to-purple-500 flex items-center justify-center mb-6">
              👥
            </div>

            <h3 className="text-2xl font-bold mb-4">
              Comunidad Activa
            </h3>

            <p className="text-white/60">
              Jugadores, equipos y fanáticos viven el competitivo al máximo. La comunidad Glamour impulsa
              el crecimiento de la escena con respeto, rivalidad y pasión.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#1a1029]/50 backdrop-blur rounded-3xl p-8 border border-purple-500/10 hover:border-cyan-400/30 transition hover:-translate-y-2">
            <div className="w-16 h-16 rounded-2xl bg-linear-to-r from-purple-500 to-cyan-400 flex items-center justify-center mb-6">
              🥇
            </div>

            <h3 className="text-2xl font-bold mb-4">
              Experiencia Única
            </h3>

            <p className="text-white/60">
              Nivel competitivo, espectáculo y emoción en cada enfrentamiento. Glamour ofrece una experiencia
              de esports intensa y profesional en cada torneo.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}