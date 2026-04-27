import { getTeams } from "@/features/equipos/services/equipo.service"
import { getDivisions } from "@/features/divisiones/services/divisions.service"

import { TeamTable } from "@/features/equipos/components/team-table"

import { getCurrentUser } from "@/lib/auth/getCurrentUser"

export default async function LeaderTeamPage() {

  // 🔥 usuario autenticado
  const user = await getCurrentUser()

  // 🔒 esto ya filtra SOLO su equipo
  const teams = await getTeams(user)

  const divisions = await getDivisions()

  return (
    <div className="p-6 space-y-6">

      {/* 🧠 título más claro para leader */}
      <h1 className="text-2xl font-bold text-white">
        Mi Equipo
      </h1>

      {/* ❌ NO usamos TeamsHeader (no puede crear equipos) */}

      <TeamTable
        teams={teams}
        divisions={divisions}
      />

    </div>
  )
}