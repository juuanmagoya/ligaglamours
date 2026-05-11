// features/jugadores/components/player-table.tsx
import { Player } from "../types/player.type"
import { PlayerRow } from "./player-row"

type Props = {
  players: Player[]
  teams: { id: string; name: string }[]
  user: {
    role: "admin" | "leader"
    team_id?: string | null
  }
}

export function PlayerTable({ players, teams, user }: Props) {
  if (players.length === 0) {
    return (
      <div className="text-center py-12 rounded-xl bg-[#1a1029]/30 border border-purple-500/20">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-500/10 flex items-center justify-center">
          <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <p className="text-white/60">No se encontraron jugadores</p>
        <p className="text-white/30 text-sm mt-1">Intenta con otros filtros o crea un nuevo jugador</p>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-purple-500/20 bg-[#1a1029]/30 backdrop-blur-sm overflow-hidden">
      {/* Scroll horizontal solo para móvil */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-500px md:min-w-0">
          <thead className="bg-purple-500/10 border-b border-purple-500/20">
            <tr>
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-purple-300">
                Nickname
              </th>
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-purple-300 hidden sm:table-cell">
                ID Game
              </th>
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-purple-300 hidden md:table-cell">
                Equipo
              </th>
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-purple-300">
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
                user={user}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}