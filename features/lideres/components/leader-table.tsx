import { Leader } from "../types/leader.type"
import { LeaderRow } from "./leader-row"

type Props = {
  leaders: Leader[]
  teams: { id: string; name: string }[]
}

export function LeaderTable({ leaders, teams }: Props) {
  return (
    <div className="rounded-xl border border-purple-200 bg-white/80 backdrop-blur">

      <table className="w-full text-sm">

        <thead className="bg-purple-100 text-purple-900">
          <tr>

            <th className="p-4 text-left">
              Nombre
            </th>

            <th className="p-4 text-left hidden md:table-cell">
              Email
            </th>

            <th className="p-4 text-left hidden md:table-cell">
              Equipo
            </th>

            <th className="p-4 text-left">
              Estado
            </th>

            <th className="p-4 text-left">
              Acciones
            </th>

          </tr>
        </thead>

        <tbody>
          {leaders.map((leader) => (
            <LeaderRow
              key={leader.id}
              leader={leader}
              teams={teams}
            />
          ))}
        </tbody>

      </table>

    </div>
  )
}