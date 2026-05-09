"use client"

import { useMemo, useState } from "react" // 👈 Elimina useEffect
import { PlayersHeader } from "@/features/jugadores/components/player-header"
import { PlayerTable } from "@/features/jugadores/components/player-table"
import { PlayerFilters } from "@/features/jugadores/components/player-filters"
import { AppUser } from "@/features/users/types/user.types"
import { Player } from "@/features/jugadores/types/player.type"
import { Team } from "@/features/equipos/types/equipo.type"

type PlayersClientProps = {
  initialPlayers: Player[]
  initialTeams: Team[]
  user: AppUser
}

export function PlayersClient({ initialPlayers, initialTeams, user }: PlayersClientProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTeam, setSelectedTeam] = useState("all")

  // ✅ Calcular los jugadores filtrados DURANTE EL RENDERIZADO
  const filteredPlayers = useMemo(() => {
    let filtered = [...initialPlayers]
    
    // Filtro por búsqueda (nickname o id_game)
    if (searchTerm && searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase().trim()
      filtered = filtered.filter(player => 
        player.nickname?.toLowerCase().includes(term) ||
        player.id_game?.toLowerCase().includes(term)
      )
    }
    
    // Filtro por equipo
    if (selectedTeam !== "all") {
      filtered = filtered.filter(player => player.team_id === selectedTeam)
    }
    
    return filtered
  }, [searchTerm, selectedTeam, initialPlayers]) // 👈 Dependencias: solo recalcula cuando cambian

  const handleClearFilters = () => {
    setSearchTerm("")
    setSelectedTeam("all")
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-[#0a0615] via-[#0a0615] to-purple-900/10">
      <div className="container mx-auto px-4 md:px-6 py-8">
        
        <div className="mb-6">
          <PlayersHeader teams={initialTeams} user={user} />
        </div>

        <div className="mb-6">
          <PlayerFilters
            teams={initialTeams}
            selectedTeam={selectedTeam}
            searchTerm={searchTerm}
            onTeamChange={setSelectedTeam}
            onSearchChange={setSearchTerm}
            onClearFilters={handleClearFilters}
          />
        </div>

        {/* 👇 Ahora pasamos la lista filtrada directamente */}
        <PlayerTable
          players={filteredPlayers}
          teams={initialTeams}
          user={user}
        />

        <div className="mt-4 text-center text-xs text-white/30">
          Mostrando {filteredPlayers.length} de {initialPlayers.length} jugadores
        </div>
      </div>
    </div>
  )
}