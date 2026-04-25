import { getPositions } from "@/features/posiciones/services/position.service"
import { getTeams } from "@/features/equipos/services/equipo.service"
import { getDivisions } from "@/features/divisiones/services/divisions.service"

import { PositionsHeader } from "@/features/posiciones/components/position-header"
import { PositionTable } from "@/features/posiciones/components/position-table"

import { getCurrentUser } from "@/lib/auth/getCurrentUser"

export default async function PositionsPage() {

  // 🔥 usuario centralizado
  const user = await getCurrentUser()

  const positions = await getPositions()
  const teams = await getTeams(user)
  const divisions = await getDivisions()

  return (
    <div className="p-6 space-y-6">

      <PositionsHeader 
        teams={teams}
        divisions={divisions}
      />

      <PositionTable
        positions={positions}
        teams={teams}
        divisions={divisions}
      />

    </div>
  )
}