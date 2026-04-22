import { getPlayers } from "@/features/jugadores/services/player.service"
import { getTeams } from "@/features/equipos/services/equipo.service"

import { PlayersHeader } from "@/features/jugadores/components/player-header"
import { PlayerTable } from "@/features/jugadores/components/player-table"

export default async function PlayersPage() {

  const players = await getPlayers()

  const teams = await getTeams()

  return (
    <div className="p-6 space-y-6">

      <PlayersHeader teams={teams} />

      <PlayerTable
        players={players}
        teams={teams}
      />

    </div>
  )
}