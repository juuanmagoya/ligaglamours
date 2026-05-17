"use client";

import Image from "next/image";
import { useState } from "react";
import { Crown, Trophy, Star, Flame, Shield, Minus } from "lucide-react";

// Tipos para los campeones
interface Champion {
  id: number;
  team: string;
  division: string;
  divisionLevel: number;
  description: string;
  image: string;
  stats: {
    wins: number;
    losses: number;
    draws: number; // Añadido empates
    totalGames: number; // Total de partidos (calculado automáticamente)
    winRate: number; // Porcentaje de victorias (calculado automáticamente)
  };
  achievements: string[];
}

// Función para calcular estadísticas automáticamente
const calculateStats = (wins: number, losses: number, draws: number) => {
  const totalGames = wins + losses + draws;
  const winRate = totalGames > 0 ? Number(((wins / totalGames) * 100).toFixed(1)) : 0;
  
  return {
    wins,
    losses,
    draws,
    totalGames,
    winRate,
  };
};

export function ChampionsSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Campeones de las 4 divisiones (liga) - Ahora con empates
  const leagueChampions: Champion[] = [
    {
      id: 1,
      team: "Kosmos Khaos",
      division: "Primera División",
      divisionLevel: 1,
      description: "Campeones absolutos de la máxima categoría con dominio total",
      image: "/img/khaos.PNG",
      stats: calculateStats(9, 0 , 2), // 9 victorias, 0 derrotas, 2 empates
      achievements: ["Juego Agresivo", "MVP de la temporada", "Equipo Revelación"],
    },
    {
      id: 2,
      team: "Fenix Yokai",
      division: "Segunda División",
      divisionLevel: 2,
      description: "Campeones con ascenso directo a Primera División",
      image: "/img/fenixyokai.jpeg",
      stats: calculateStats(10, 0, 1), // 10 victorias, 0 derrotas, 1 empate
      achievements: ["Ascenso Imparable", "Precisión Total", "Fuerza Estratégica"],
    },
    {
      id: 3,
      team: "Beastmode",
      division: "Tercera División",
      divisionLevel: 3,
      description: "Campeones invictos demostrando superioridad absoluta",
      image: "/img/Beastmode.png",
      stats: calculateStats(10, 1, 0), // 10 victorias, 1 derrota, 0 empates
      achievements: ["Vivctoria Legendaria", "Dominio Absoluto", "Imparables"],
    },
    {
      id: 4,
      team: "Harakiri Sochi",
      division: "Cuarta División",
      divisionLevel: 4,
      description: "Los campeones que iniciaron su legado desde abajo",
      image: "/img/harakiri.jpeg",
      stats: calculateStats(8, 0, 1), // 8 victorias, 0 derrotas, 1 empate
      achievements: ["Honor Absoluto", "Legado Eterno", "Fuerza Renacida"],
    },
  ];

  // Campeón de torneo
  const tournamentChampion = {
    team: "Octa Gaming",
    tournament: "Torneo Oficial 5vs5",
    description: "Dominó la competencia con estrategia impecable, invicto durante todo el Torneo Oficial 5vs5, demostrando ser el mejor equipo en formato eliminación directa",
    image: "/img/octa.png",
  };

  // Colores según división
  const getDivisionColors = (level: number) => {
    const colors = {
      1: { bg: "from-yellow-600/20 to-amber-600/20", border: "border-yellow-500/30", gradient: "from-yellow-500 to-amber-500", badge: "bg-linear-to-r from-yellow-500 to-amber-500" },
      2: { bg: "from-gray-400/20 to-gray-500/20", border: "border-gray-400/30", gradient: "from-gray-400 to-gray-500", badge: "bg-linear-to-r from-gray-400 to-gray-500" },
      3: { bg: "from-orange-600/20 to-orange-700/20", border: "border-orange-500/30", gradient: "from-orange-500 to-orange-600", badge: "bg-linear-to-r from-orange-500 to-orange-600" },
      4: { bg: "from-blue-600/20 to-blue-700/20", border: "border-blue-500/30", gradient: "from-blue-500 to-blue-600", badge: "bg-linear-to-r from-blue-500 to-blue-600" },
    };
    return colors[level as keyof typeof colors] || colors[1];
  };

  // Función para obtener color según tipo de estadística
  const getStatColor = (type: 'wins' | 'draws' | 'losses') => {
    switch(type) {
      case 'wins': return 'text-green-400';
      case 'draws': return 'text-yellow-400';
      case 'losses': return 'text-red-400';
      default: return 'text-white';
    }
  };

  // Función para obtener ícono según tipo de estadística
  const getStatIcon = (type: 'wins' | 'draws' | 'losses') => {
    switch(type) {
      case 'wins': return <Trophy className="w-3 h-3" />;
      case 'draws': return <Minus className="w-3 h-3" />;
      case 'losses': return <Flame className="w-3 h-3" />;
      default: return null;
    }
  };

  return (
    <section id="champions" className="py-24 relative overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 bg-linear-to-b from-purple-900/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header - Siempre visible con animación */}
        <div className="text-center max-w-4xl mx-auto mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 mb-6 backdrop-blur-sm">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-semibold text-purple-300">TEMPORADA 8</span>
            <Flame className="w-4 h-4 text-orange-400" />
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-linear-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Nuestros Campeones
            </span>
          </h2>

          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            Equipos que demostraron su supremacía y se coronaron campeones en sus respectivas categorías
          </p>
        </div>

        {/* Título de sección - Campeones de Liga */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20">
            <Crown className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-semibold text-purple-300">CAMPEONES DE LIGA</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mt-4 text-white">
            Divisiones Oficiales
          </h3>
          <p className="text-white/50 text-sm mt-2">
            Primera, Segunda, Tercera y Cuarta División
          </p>
        </div>

        {/* Grid de campeones de liga */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {leagueChampions.map((champion, index) => {
            const colors = getDivisionColors(champion.divisionLevel);
            return (
              <div
                key={champion.id}
                onMouseEnter={() => setHoveredCard(champion.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`group relative bg-linear-to-br ${colors.bg} backdrop-blur rounded-2xl overflow-hidden border ${colors.border} transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-purple-500/20 animate-fade-in-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Efecto de brillo en hover */}
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                {/* Imagen con overlay mejorado */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={champion.image}
                    alt={champion.team}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Gradiente overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Badge de división */}
                  <div className={`absolute top-4 right-4 ${colors.badge} rounded-full p-2 shadow-lg transform group-hover:scale-110 transition-all duration-300`}>
                    <div className="flex items-center gap-1 px-3 py-1">
                      <Crown className="w-3 h-3 text-white" />
                      <span className="text-white font-bold text-sm">{champion.divisionLevel}ª</span>
                    </div>
                  </div>

                  {/* Stats flotantes en hover - Ahora con empates */}
                  <div className={`absolute bottom-4 left-4 right-4 transition-all duration-500 ${
                    hoveredCard === champion.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}>
                    <div className="bg-black/60 backdrop-blur rounded-lg p-3">
                      <div className="grid grid-cols-4 gap-2 text-center">
                        <div>
                          <div className="flex items-center justify-center gap-1 text-green-400 font-bold text-sm">
                            {getStatIcon('wins')}
                            {champion.stats.wins}
                          </div>
                          <div className="text-white/60 text-xs">Victorias</div>
                        </div>
                        <div>
                          <div className="flex items-center justify-center gap-1 text-yellow-400 font-bold text-sm">
                            {getStatIcon('draws')}
                            {champion.stats.draws}
                          </div>
                          <div className="text-white/60 text-xs">Empates</div>
                        </div>
                        <div>
                          <div className="flex items-center justify-center gap-1 text-red-400 font-bold text-sm">
                            {getStatIcon('losses')}
                            {champion.stats.losses}
                          </div>
                          <div className="text-white/60 text-xs">Derrotas</div>
                        </div>
                        <div>
                          <div className="text-cyan-400 font-bold text-sm">{champion.stats.winRate}%</div>
                          <div className="text-white/60 text-xs">Win Rate</div>
                        </div>
                      </div>
                      {/* Total de partidos */}
                      <div className="text-center mt-2 pt-2 border-t border-white/10">
                        <span className="text-white/40 text-xs">Total: {champion.stats.totalGames} partidos</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contenido mejorado - El nombre del equipo siempre visible */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className={`w-4 h-4 bg-linear-to-r ${colors.gradient} bg-clip-text text-transparent`} />
                    <span className={`text-xs font-semibold bg-linear-to-r ${colors.gradient} bg-clip-text text-transparent`}>
                      {champion.division}
                    </span>
                  </div>

                  {/* El nombre del equipo permanece visible, solo cambia de color en hover */}
                  <h3 className={`text-xl font-bold mb-3 transition-all duration-300 ${
                    hoveredCard === champion.id 
                      ? "bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent" 
                      : "text-white"
                  }`}>
                    {champion.team}
                  </h3>

                  <p className="text-white/60 text-sm mb-4 line-clamp-2">
                    {champion.description}
                  </p>

                  {/* Logros */}
                  <div className="flex flex-wrap gap-2">
                    {champion.achievements.map((achievement, i) => (
                      <span key={i} className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 text-white/50 text-xs">
                        <Star className="w-3 h-3" />
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Indicador de hover */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r ${colors.gradient} transform origin-left transition-transform duration-500 ${
                  hoveredCard === champion.id ? "scale-x-100" : "scale-x-0"
                }`} />
              </div>
            );
          })}
        </div>

        {/* Título de sección - Campeón de Torneo */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-semibold text-yellow-300">CAMPEÓN DE TORNEO</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mt-4 text-white">
            Torneo Oficial 5vs5
          </h3>
          <p className="text-white/50 text-sm mt-2">
            Formato eliminación directa
          </p>
        </div>

        {/* Campeón de Torneo - Versión destacada (siempre visible) */}
        <div className="relative group animate-fade-in-up">
          {/* Efectos decorativos */}
          <div className="absolute -inset-1 bg-linear-to-r from-purple-600 via-pink-600 to-cyan-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-700" />
          
          <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-purple-900/40 via-pink-900/20 to-cyan-900/40 backdrop-blur border border-purple-500/30 p-8 md:p-12">
            {/* Patrón de fondo */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
            
            {/* Elementos flotantes */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-linear-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

            <div className="relative z-10">
              {/* Badge del torneo */}
              <div className="flex justify-center mb-8">
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-linear-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 backdrop-blur animate-pulse">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  <span className="text-yellow-400 font-bold text-sm tracking-wider">🏆 CAMPEÓN OFICIAL TORNEO 5VS5 🏆</span>
                  <Flame className="w-5 h-5 text-orange-400" />
                </div>
              </div>

              <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
                {/* Logo del equipo con efecto 3D */}
                <div className="relative group/logo">
                  <div className="absolute inset-0 bg-linear-to-r from-purple-500 to-cyan-500 rounded-full blur-2xl opacity-50 group-hover/logo:opacity-75 transition-opacity duration-500" />
                  <div className="relative w-48 h-48 lg:w-64 lg:h-64">
                    <Image
                      src={tournamentChampion.image}
                      alt={tournamentChampion.team}
                      fill
                      className="object-contain transform group-hover/logo:scale-110 transition-transform duration-700 drop-shadow-2xl"
                    />
                  </div>
                  
                  {/* Efecto de rotación */}
                  <div className="absolute -inset-4 rounded-full border-2 border-dashed border-purple-500/30 animate-spin-slow" />
                </div>

                {/* Información del campeón */}
                <div className="text-center lg:text-left flex-1">
                  <h3 className="text-4xl lg:text-6xl font-bold mb-4 bg-linear-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                    {tournamentChampion.team}
                  </h3>

                  <p className="text-white/80 text-lg mb-6 max-w-xl">
                    {tournamentChampion.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Llamada a la acción */}
        <div className="text-center mt-16">
          <p className="text-white/50 text-sm">
            ¿Quieres ver tu equipo aquí?{" "}
            <a href="#contact" className="text-purple-400 hover:text-purple-300 transition-colors">
              Participa en la próxima temporada →
            </a>
          </p>
        </div>
      </div>

      {/* Estilos adicionales para animaciones */}
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
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
      `}</style>
    </section>
  );
}