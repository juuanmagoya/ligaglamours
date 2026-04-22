import { Player } from "../types/player.type"
import { PlayerRow } from "./player-row"

type Props = {
  players: Player[]
  teams: { id: string; name: string }[]
}

export function PlayerTable({ players, teams }: Props) {
  return (
    <div className="rounded-xl border border-purple-200 bg-white/80 backdrop-blur">

      <table className="w-full text-sm">

        <thead className="bg-purple-100 text-purple-900">
          <tr>

            <th className="p-4 text-left">
              Nickname
            </th>

            <th className="p-4 text-left">
              ID Game
            </th>

            <th className="p-4 text-left hidden md:table-cell">
              Equipo
            </th>

            <th className="p-4 text-left">
              Acciones
            </th>

          </tr>
        </thead>

        <tbody>
          {players.map((player) => (
            <PlayerRow
              key={player.id}
              player={player}
              teams={teams}
            />
          ))}
        </tbody>

      </table>

    </div>
  )
}