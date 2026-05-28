import { Match } from "../types/match.type"

import { MatchRow } from "./match-row"

import { Division } from "@/features/divisiones/types/division.type"
import { Team } from "@/features/equipos/types/equipo.type"
import { Fecha } from "@/features/fechas/types/fecha.type"

type Props = {
  matches: Match[]

  fechas: Fecha[]
  divisions: Division[]
  teams: Team[]
}

export function MatchTable({
  matches,
  fechas,
  divisions,
  teams
}: Props) {

  return (
    <div className="rounded-xl border border-purple-200 bg-white/80 backdrop-blur overflow-x-auto">

      <table className="w-full text-sm">

        <thead className="bg-purple-100 text-purple-900">

          <tr>

            <th className="p-4 text-left">
              Fecha
            </th>

            <th className="p-4 text-left">
              División
            </th>

            <th className="p-4 text-left">
              Enfrentamiento
            </th>

            <th className="p-4 text-left">
              Resultado
            </th>

            <th className="p-4 text-left hidden lg:table-cell">
              Fecha partido
            </th>

            <th className="p-4 text-left">
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
  )
}