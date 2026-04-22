import { Team } from "../types/equipo.type"
import { TeamRow } from "./team-row"

type Props = {
  teams: Team[]
  divisions: { id: string; name: string }[]
}

export function TeamTable({ teams, divisions }: Props) {
  return (
    <div className="rounded-xl border border-purple-200 bg-white/80 backdrop-blur">

      <table className="w-full text-sm">

        <thead className="bg-purple-100 text-purple-900">
          <tr>
            <th className="p-4 text-left">Logo</th>

            <th className="p-4 text-left">Equipo</th>

            <th className="p-4 text-left hidden md:table-cell">
              División
            </th>

            <th className="p-4 text-left hidden lg:table-cell">
              Descripción
            </th>

            <th className="p-4 text-left">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {teams.map((team) => (
            <TeamRow
              key={team.id}
              team={team}
              divisions={divisions}
            />
          ))}
        </tbody>

      </table>

    </div>
  )
}