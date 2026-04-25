import { getTeams } from "@/features/equipos/services/equipo.service"
import { getDivisions } from "@/features/divisiones/services/divisions.service"

import { TeamsHeader } from "@/features/equipos/components/team-header"
import { TeamTable } from "@/features/equipos/components/team-table"

import { getCurrentUser } from "@/lib/auth/getCurrentUser"

export default async function TeamsPage() {

  // 🔥 usuario centralizado
  const user = await getCurrentUser()

  const teams = await getTeams(user)
  const divisions = await getDivisions()

  return (
    <div className="p-6 space-y-6">

      <TeamsHeader divisions={divisions} />

      <TeamTable
        teams={teams}
        divisions={divisions}
      />

    </div>
  )
}