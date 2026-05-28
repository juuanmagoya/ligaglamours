"use client"

import { useMemo, useState } from "react"

import { Trophy } from "lucide-react"

import { PublicMatch } from "../types/match-public.type"

import { PublicMatchesTabs } from "./public-matches-tabs"

import { PublicMatchesList } from "./public-matches-list"

type Props = {
  matches: PublicMatch[]
}

export function PublicMatchesView({
  matches
}: Props) {

  // Fechas ordenadas
  const fechas = useMemo(() => {

    return Array.from(

      new Set(

        matches.map(
          match =>
            match.fecha?.name ??
            "Sin fecha"
        )

      )

    ).sort((a, b) => {

      const numA =
        Number(a.replace(/\D/g, ""))

      const numB =
        Number(b.replace(/\D/g, ""))

      return numA - numB

    })

  }, [matches])

  const [
    selectedFecha,
    setSelectedFecha
  ] = useState(fechas[0] ?? "")

  const filteredMatches =
    matches.filter(

      match =>
        (
          match.fecha?.name ??
          "Sin fecha"
        ) === selectedFecha

    )

  return (
    <div
      className="
        min-h-screen

        bg-linear-to-b
        from-[#0a0615]
        via-[#0a0615]
        to-purple-900/10
      "
    >

      {/* Hero */}
      <div
        className="
          relative overflow-hidden

          border-b
          border-purple-500/20

          bg-[#1a1029]/50
          backdrop-blur
        "
      >

        <div
          className="
            absolute -top-20 -right-20

            w-80 h-80

            rounded-full

            bg-purple-500/20

            blur-3xl
          "
        />

        <div
          className="
            container mx-auto

            px-4 md:px-6
            py-12

            relative z-10
          "
        >

          <div
            className="
              flex items-center gap-3
              mb-3
            "
          >

            <Trophy
              className="
                w-7 h-7
                text-purple-400
              "
            />

            <span
              className="
                text-purple-300

                font-semibold
                tracking-wider
              "
            >
              FIXTURE OFICIAL
            </span>

          </div>

          <h1
            className="
              text-4xl md:text-5xl

              font-black
            "
          >

            <span
              className="
                bg-linear-to-r
                from-purple-400
                to-pink-400

                bg-clip-text
                text-transparent
              "
            >
              Enfrentamientos
            </span>

          </h1>

          <p
            className="
              text-white/50

              mt-3

              max-w-2xl
            "
          >
            SeguÍ todos los resultados
            y enfrentamientos de la liga
            organizados por fechas y
            divisiones.
          </p>

        </div>

      </div>

      {/* Contenido */}
      <div
        className="
          container mx-auto

          px-4 md:px-6
          py-8
        "
      >

        {/* Tabs */}
        <PublicMatchesTabs
          fechas={fechas}
          selected={selectedFecha}
          onChange={setSelectedFecha}
        />

        {/* Lista */}
        <PublicMatchesList
          matches={filteredMatches}
        />

      </div>

    </div>
  )
}