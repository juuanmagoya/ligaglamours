import { Match } from "../types/match.type"

import { DivisionMatchesCard } from "./division-matches-card"

import { Division } from "@/features/divisiones/types/division.type"

import { Team } from "@/features/equipos/types/equipo.type"

import { Fecha } from "@/features/fechas/types/fecha.type"

type Props = {
  matches: Match[]

  fechas: Fecha[]
  divisions: Division[]
  teams: Team[]
}

export function MatchesGrouped({
  matches,
  fechas,
  divisions,
  teams
}: Props) {

  // 🔥 agrupar por fecha -> división
  const groupedMatches = matches.reduce(

    (acc, match) => {

      const fechaName =
        match.fecha?.name ??
        "Sin fecha"

      const divisionName =
        match.division?.name ??
        "Sin división"

      // crear fecha
      if (!acc[fechaName]) {
        acc[fechaName] = {}
      }

      // crear división
      if (
        !acc[fechaName][divisionName]
      ) {
        acc[fechaName][divisionName] = []
      }

      // agregar match
      acc[fechaName][divisionName]
        .push(match)

      return acc

    },

    {} as Record<
      string,
      Record<string, Match[]>
    >

  )

  return (
    <div className="space-y-10">

      {Object.entries(groupedMatches)
        .map(([fechaName, divisionsData]) => (

        <section
          key={fechaName}
          className="space-y-6"
        >

          {/* Fecha */}
          <div>

            <h2 className="
              text-2xl font-bold text-purple-900
              border-b border-purple-200 pb-2
            ">
              {fechaName}
            </h2>

          </div>

          {/* Divisiones */}
          <div className="space-y-6">

            {Object.entries(divisionsData)
              .map(([divisionName, divisionMatches]) => (

              <DivisionMatchesCard
                key={divisionName}

                divisionName={divisionName}

                matches={divisionMatches}

                fechas={fechas}
                divisions={divisions}
                teams={teams}
              />

            ))}

          </div>

        </section>

      ))}

    </div>
  )
}