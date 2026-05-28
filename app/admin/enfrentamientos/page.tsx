import { getMatches } from "@/features/enfrentamientos/services/matches.service"

import { getFechas } from "@/features/fechas/services/fecha.service"

import { getDivisions } from "@/features/divisiones/services/divisions.service"

import { getTeams } from "@/features/equipos/services/equipo.service"

import { MatchesHeader } from "@/features/enfrentamientos/components/matches-header"

import { MatchTable } from "@/features/enfrentamientos/components/match-table"

import { getCurrentUser } from "@/lib/auth/getCurrentUser"

// 🔥 Revalidar cada 60 segundos
export const revalidate = 60

export default async function MatchesPage() {

  // 🔥 usuario centralizado
  const user = await getCurrentUser()

  const [
    matches,
    fechas,
    divisions,
    teams
  ] = await Promise.all([

    getMatches(),

    getFechas(),

    getDivisions(),

    getTeams(user)

  ])

  return (
    <div className="p-6 space-y-6">

      <MatchesHeader
        fechas={fechas}
        divisions={divisions}
        teams={teams}
      />

      <MatchTable
        matches={matches}
        fechas={fechas}
        divisions={divisions}
        teams={teams}
      />

    </div>
  )
}