import { getPlayers } from "@/features/jugadores/services/player.service"
import { getTeams } from "@/features/equipos/services/equipo.service"

import { PlayersHeader } from "@/features/jugadores/components/player-header"
import { PlayerTable } from "@/features/jugadores/components/player-table"

import { getCurrentUser } from "@/lib/auth/getCurrentUser"

export default async function PlayersPage() {

  // 🔐 usuario autenticado
  const user = await getCurrentUser()

  // 🔥 jugadores filtrados automáticamente por el service
  const players = await getPlayers(user)

  // 📦 equipos del líder (en tu caso probablemente uno solo)
  const teams = await getTeams(user)

  return (
    <div className="p-6 space-y-6">

      <PlayersHeader teams={teams} user={user} />

      <PlayerTable
        players={players}
        teams={teams}
        user={user} // 🔥 CLAVE
      />

    </div>
  )
}