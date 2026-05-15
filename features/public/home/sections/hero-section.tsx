"use client";

import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-screen pt-20 flex items-center overflow-hidden">
      {/* overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#0a0615]/50 to-[#0a0615]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* badge */}
          <div className="inline-flex items-center gap-2 bg-[#1a1029]/50 backdrop-blur px-6 py-3 rounded-full mb-8">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-sm font-semibold tracking-wider text-cyan-400">
              TEMPORADA 10
            </span>
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
          </div>

          {/* title */}
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="text-purple-500">Liga</span>
            <span className="text-white"> Glamour</span>
          </h1>

          {/* description */}
          <p className="text-xl md:text-2xl text-white/70 mb-10 max-w-2xl mx-auto">
            La competición más prestigiosa de{" "}
            <span className="text-cyan-400 font-semibold">Mobile Legends</span>{" "}
            en Argentina. Donde los mejores equipos luchan por la gloria.
          </p>

          {/* stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12">
            {[
              { value: "48", label: "Equipos Activos" },
              { value: "4", label: "Divisiones" },
              { value: "200+", label: "Jugadores" },
              { value: "$400K", label: "Premios" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-[#1a1029]/50 backdrop-blur rounded-2xl p-6 text-center border border-purple-500/10"
              >
                <div className="text-3xl font-bold text-purple-400">
                  {stat.value}
                </div>
              <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/public/divisiones"
              className="px-8 py-4 rounded-full bg-linear-to-r from-purple-500 to-pink-500 font-bold hover:scale-105 transition"
            >
              Ver Divisiones →
            </Link>

            <Link
              href="#champions"
              className="px-8 py-4 rounded-full border border-purple-500/30 hover:bg-white/5 transition"
            >
              Ver Campeones
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}