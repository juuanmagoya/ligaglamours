import { getLeaders } from "@/features/lideres/services/leader.service"
import { getTeams } from "@/features/equipos/services/equipo.service"

import { LeadersHeader } from "@/features/lideres/components/leader-header"
import { LeaderTable } from "@/features/lideres/components/leader-table"

export default async function LeadersPage() {

  const leaders = await getLeaders()

  const teams = await getTeams()

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