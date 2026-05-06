"use client"

import { TeamWithRelations } from "@/features/equipos/types/equipo.type"
import Image from "next/image"
import { Users, ChevronRight } from "lucide-react"

type TeamsListProps = {
  teams: TeamWithRelations[]
  onSelect: (team: TeamWithRelations) => void
}

export function TeamsList({ teams, onSelect }: TeamsListProps) {
  // Función para obtener color de división
  const getDivisionColor = (divisionName: string) => {
    if (divisionName?.includes("Primera") || divisionName?.includes("1ª")) {
      return "border-yellow-500/30 bg-yellow-500/5"
    }
    if (divisionName?.includes("Segunda") || divisionName?.includes("2ª")) {
      return "border-gray-400/30 bg-gray-400/5"
    }
    if (divisionName?.includes("Tercera") || divisionName?.includes("3ª")) {
      return "border-orange-500/30 bg-orange-500/5"
    }
    if (divisionName?.includes("Cuarta") || divisionName?.includes("4ª")) {
      return "border-blue-500/30 bg-blue-500/5"
    }
    return "border-purple-500/30 bg-purple-500/5"
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
      {teams.map((team) => {
        const divisionName = team.divisions?.[0]?.name || "División"
        const divisionColor = getDivisionColor(divisionName)
        
        return (
          <div
            key={team.id}
            onClick={() => onSelect(team)}
            className="group relative cursor-pointer rounded-2xl bg-[#1a1029]/50 backdrop-blur border border-purple-500/20 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20"
          >
            {/* Efecto de brillo en hover */}
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            {/* Logo del equipo */}
            <div className="relative pt-6 pb-3 px-4">
              <div className="w-24 h-24 mx-auto flex items-center justify-center">
                {team.logo_url ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={team.logo_url}
                      alt={team.name}
                      fill
                      className="object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-110"
                      sizes="96px"
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-full bg-linear-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                    <span className="text-3xl font-bold text-purple-400">
                      {team.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Nombre del equipo */}
            <div className="text-center px-3 pb-2">
              <h3 className="font-bold text-white text-base line-clamp-1 group-hover:text-purple-300 transition-colors">
                {team.name}
              </h3>
            </div>

            {/* Badge de división */}
            <div className="mx-3 mb-3">
              <div className={`inline-flex w-full items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border ${divisionColor} text-white/80`}>
                <Users className="w-3 h-3" />
                <span>{divisionName}</span>
              </div>
            </div>

            {/* Indicador de ver jugadores */}
            <div className="border-t border-purple-500/20 px-4 py-2 bg-linear-to-r from-purple-500/5 to-transparent">
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/40">{team.players?.length || 0} jugadores</span>
                <span className="text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  Ver más <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}