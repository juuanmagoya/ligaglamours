// features/jugadores/components/player-filters.tsx
"use client"

import { Search, X } from "lucide-react"
import { useState } from "react"

type Team = {
  id: string
  name: string
}

type PlayerFiltersProps = {
  teams: Team[]
  selectedTeam: string
  searchTerm: string
  onTeamChange: (teamId: string) => void
  onSearchChange: (search: string) => void
  onClearFilters: () => void
}

export function PlayerFilters({
  teams,
  selectedTeam,
  searchTerm,
  onTeamChange,
  onSearchChange,
  onClearFilters
}: PlayerFiltersProps) {
  const [showFilters, setShowFilters] = useState(false)

  const hasActiveFilters = selectedTeam !== "all" || searchTerm !== ""

  return (
    <div className="space-y-4">
      {/* Barra de búsqueda y botón de filtros */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
          <input
            type="text"
            placeholder="Buscar por nombre o ID de juego..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#1a1029]/50 border border-purple-500/30 text-white placeholder:text-white/30 focus:outline-none focus:border-purple-400 transition-all duration-300"
          />
        </div>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`px-4 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 ${
            showFilters || hasActiveFilters
              ? "bg-purple-500/20 border border-purple-400 text-purple-300"
              : "bg-[#1a1029]/50 border border-purple-500/30 text-white/60 hover:text-white"
          }`}
        >
          <span className="text-sm hidden sm:inline">Filtros</span>
          {hasActiveFilters && (
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
          )}
        </button>

        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="px-3 py-2.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition-all duration-300"
            title="Limpiar filtros"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Panel de filtros desplegable */}
      {showFilters && (
        <div className="grid grid-cols-1 gap-4 p-4 rounded-xl bg-[#1a1029]/50 border border-purple-500/30 backdrop-blur animate-in fade-in slide-in-from-top-2 duration-300">
          {/* Filtro por Equipo */}
          <div>
            <label className="block text-xs font-medium text-purple-300 mb-2">
              Equipo
            </label>
            <select
              value={selectedTeam}
              onChange={(e) => onTeamChange(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#0a0615]/80 border border-purple-500/30 text-white text-sm focus:outline-none focus:border-purple-400 transition-all duration-300"
            >
              <option value="all">Todos los equipos</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Contador de resultados */}
      <div className="flex justify-between items-center text-xs text-white/40">
        <span>Resultados mostrados</span>
        {hasActiveFilters && (
          <span className="text-purple-300">
            Filtros activos
          </span>
        )}
      </div>
    </div>
  )
}