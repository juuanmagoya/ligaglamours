import { Match } from "../types/match.type"

import { MatchRow } from "./match-row"

import { Division } from "@/features/divisiones/types/division.type"

import { Team } from "@/features/equipos/types/equipo.type"

import { Fecha } from "@/features/fechas/types/fecha.type"

type Props = {
  divisionName: string

  matches: Match[]

  fechas: Fecha[]
  divisions: Division[]
  teams: Team[]
}

// 🎨 colores por división
const divisionColors: Record<string, string> = {

  "Primera División":
    "border-purple-300 bg-purple-50",

  "Segunda División":
    "border-blue-300 bg-blue-50",

  "Tercera División":
    "border-emerald-300 bg-emerald-50",

  "Cuarta División":
    "border-orange-300 bg-orange-50"

}

export function DivisionMatchesCard({
  divisionName,
  matches,
  fechas,
  divisions,
  teams
}: Props) {

  const divisionColor =
    divisionColors[divisionName] ??
    "border-gray-200 bg-gray-50"

  return (
    <div
      className={`
        rounded-2xl border overflow-hidden
        ${divisionColor}
      `}
    >

      {/* Header */}
      <div className="
        px-5 py-4 border-b
        bg-white/60 backdrop-blur
      ">

        <h3 className="
          text-lg font-semibold
          text-gray-800
        ">
          {divisionName}
        </h3>

      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="
            bg-white/70 text-gray-700
          ">

            <tr>

              <th className="
                p-4 text-left
              ">
                Enfrentamiento
              </th>

              <th className="
                p-4 text-left
              ">
                Resultado
              </th>

              <th className="
                p-4 text-left hidden
                lg:table-cell
              ">
                Fecha partido
              </th>

              <th className="
                p-4 text-left
              ">
                Acciones
              </th>

            </tr>

          </thead>

          <tbody>

            {matches.map((match) => (

              <MatchRow
                key={match.id}

                match={match}

                fechas={fechas}
                divisions={divisions}
                teams={teams}
              />

            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}