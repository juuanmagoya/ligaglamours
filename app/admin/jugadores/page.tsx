// app/(admin)/admin/players/page.tsx
import { getCurrentUser } from "@/lib/auth/getCurrentUser"
import { getAllPlayers } from "@/features/jugadores/services/player.service"
import { getTeams } from "@/features/equipos/services/equipo.service"
import { PlayersClient } from "./players-client"

export default async function PlayersPage() {
  // ✅ Esto corre en el servidor
  const user = await getCurrentUser()
  const players = await getAllPlayers(user)
  const teams = await getTeams(user)

  // Pasamos los datos al Client Component
  return (
    <PlayersClient
      initialPlayers={players}
      initialTeams={teams}
      user={user}
    />
  )
}