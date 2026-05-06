// page.tsx
import { Navbar } from "@/features/public/home/components/navbar"
import { getTeamsWithPlayers } from "@/features/public/equipos/services/teams-public.service"
import { TeamsView } from "@/features/public/equipos/components/teams-view"
import { TeamWithRelations } from "@/features/equipos/types/equipo.type"

// 🔥 SOLO ESTO - Revalida cada 60 segundos
export const revalidate = 60

export default async function EquiposPage() {
  let teams: TeamWithRelations[] = []

  try {
    teams = await getTeamsWithPlayers()
  } catch (error) {
    console.error("Error fetching teams:", error)
  }

  return (
    <>
      <Navbar />
      <TeamsView teams={teams} />
    </>
  )
}