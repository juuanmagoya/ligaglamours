"use client"

import { useState } from "react"
import { TeamWithRelations } from "@/features/equipos/types/equipo.type"
import { TeamsTabs } from "./teams-tabs"
import { TeamsList } from "./teams-list"
import { TeamPlayersModal } from "./team-players-modal"
import { Shield, Users } from "lucide-react"

type Props = {
  teams: TeamWithRelations[]
}

export function TeamsView({ teams }: Props) {
  // Obtener divisiones únicas
  const divisions = Array.from(
    new Set(
      teams.flatMap(team => 
        Array.isArray(team.divisions) 
          ? team.divisions.map(d => d.name)
          : team.divisions 
          ? [team.divisions.name]
          : []
      )
    )
  ).sort()

  const [selectedDivision, setSelectedDivision] = useState<string>(divisions[0] || "")
  const [selectedTeam, setSelectedTeam] = useState<TeamWithRelations | null>(null)

  // Filtrar equipos por división
  const filteredTeams = teams.filter(team => {
    if (!team.divisions) return false

    const divisionNames = Array.isArray(team.divisions)
      ? team.divisions.map(d => d.name)
      : [team.divisions.name]

    return divisionNames.includes(selectedDivision)
  })

  // Información de la división seleccionada
  const getDivisionInfo = (divisionName: string) => {
    if (divisionName.includes("Primera") || divisionName.includes("1ª")) {
      return { color: "from-yellow-500 to-amber-500", icon: "🏆" }
    }
    if (divisionName.includes("Segunda") || divisionName.includes("2ª")) {
      return { color: "from-gray-400 to-gray-500", icon: "🥈" }
    }
    if (divisionName.includes("Tercera") || divisionName.includes("3ª")) {
      return { color: "from-orange-500 to-orange-600", icon: "🥉" }
    }
    if (divisionName.includes("Cuarta") || divisionName.includes("4ª")) {
      return { color: "from-blue-500 to-blue-600", icon: "⚡" }
    }
    return { color: "from-purple-500 to-pink-500", icon: "🎮" }
  }

  const divisionInfo = getDivisionInfo(selectedDivision)

  if (!teams.length) {
    return (
      <div className="min-h-400px flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-purple-500/10 flex items-center justify-center">
            <Shield className="w-10 h-10 text-purple-400 opacity-50" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            No hay equipos registrados
          </h3>
          <p className="text-white/40 text-sm">
            Los equipos se mostrarán aquí cuando estén disponibles
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-[#0a0615] via-[#0a0615] to-purple-900/10">
      {/* Hero / Header */}
      <div className="relative overflow-hidden bg-[#1a1029]/50 backdrop-blur border-b border-purple-500/20">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 md:px-6 py-12 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-6 h-6 text-purple-400" />
                <span className="text-sm font-semibold text-purple-300 tracking-wider">
                  TEMPORADA 2026
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">
                <span className="bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Equipos
                </span>
                <span className="text-white"> participantes</span>
              </h1>
              <p className="text-white/50 text-sm mt-2">
                Conocé todos los equipos que compiten en la liga
              </p>
            </div>

            {/* Stats rápidos */}
            <div className="flex gap-4">
              <div className="px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <div className="flex items-center gap-2 text-white/60 text-xs">
                  <Users className="w-3 h-3" />
                  <span>{filteredTeams.length} equipos</span>
                </div>
              </div>
              <div className="px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <div className="flex items-center gap-2 text-white/60 text-xs">
                  <span>{divisionInfo.icon}</span>
                  <span>{selectedDivision}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="container mx-auto px-4 md:px-6 py-8">
        {/* Tabs de divisiones */}
        <TeamsTabs
          divisions={divisions}
          selected={selectedDivision}
          onChange={setSelectedDivision}
        />

        {/* Banner de la división seleccionada */}
        <div className="mb-8 p-4 rounded-xl bg-linear-to-r from-purple-500/10 to-transparent border-l-4 border-purple-400">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{divisionInfo.icon}</span>
            <div>
              <h3 className="text-white font-semibold">{selectedDivision}</h3>
              <p className="text-white/40 text-xs">
                {filteredTeams.length} equipos compitiendo por el título
              </p>
            </div>
          </div>
        </div>

        {/* Lista de equipos */}
        {filteredTeams.length > 0 ? (
          <TeamsList
            teams={filteredTeams}
            onSelect={setSelectedTeam}
          />
        ) : (
          <div className="text-center py-12">
            <p className="text-white/40">No hay equipos en esta división</p>
          </div>
        )}
      </div>

      {/* Modal de jugadores */}
      {selectedTeam && (
        <TeamPlayersModal 
          team={selectedTeam} 
          onClose={() => setSelectedTeam(null)}
        />
      )}
    </div>
  )
}