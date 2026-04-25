import { getLeaders } from "@/features/lideres/services/leader.service"
import { getTeams } from "@/features/equipos/services/equipo.service"

import { LeadersHeader } from "@/features/lideres/components/leader-header"
import { LeaderTable } from "@/features/lideres/components/leader-table"

import { getCurrentUser } from "@/lib/auth/getCurrentUser"

export default async function LeadersPage() {

  // 🔥 usuario centralizado
  const user = await getCurrentUser()

  const leaders = await getLeaders()
  const teams = await getTeams(user)

  return (
    <div className="p-6 space-y-6">

      <LeadersHeader teams={teams} />

      <LeaderTable
        leaders={leaders}
        teams={teams}
      />

    </div>
  )
}