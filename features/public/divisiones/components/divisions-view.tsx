"use client"

import { useState } from "react"
import { PositionWithRelations } from "@/features/posiciones/types/position.type"
import { DivisionsTabs } from "./divisions-tabs"
import { DivisionsTable } from "./divisions-table"
import { Trophy, TrendingUp, Calendar } from "lucide-react"

type DivisionsViewProps = {
  positions: PositionWithRelations[]
}

// Función para ordenar divisiones en el orden correcto
const sortDivisionsByOrder = (divisions: string[]): string[] => {
  // Definimos el orden que queremos
  const order = ["Primera", "Segunda", "Tercera", "Cuarta", "Quinta"]
  
  // Ordenar según el array 'order'
  return [...divisions].sort((a, b) => {
    const indexA = order.findIndex(o => a.includes(o))
    const indexB = order.findIndex(o => b.includes(o))
    
    // Si ambas están en el orden, ordenar por índice
    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB
    }
    // Si solo una está en el orden, la que está en el orden va primero
    if (indexA !== -1) return -1
    if (indexB !== -1) return 1
    // Si ninguna está en el orden, ordenar alfabéticamente
    return a.localeCompare(b)
  })
}

export function DivisionsView({ positions }: DivisionsViewProps) {

  // Divisiones únicas y ordenadas
  const divisions = sortDivisionsByOrder([
    ...new Set(positions.map((p) => p.divisions.name))
  ])

  const [selected, setSelected] = useState<string>(divisions[0] ?? "")

  // Estado de carga/vacío
  if (!positions || positions.length === 0) {
    return (
      <div className="min-h-400px flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-purple-500/10 flex items-center justify-center">
            <Trophy className="w-10 h-10 text-purple-400 opacity-50" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            No hay datos disponibles
          </h3>
          <p className="text-white/40 text-sm">
            Las posiciones se actualizarán pronto
          </p>
        </div>
      </div>
    )
  }

  const filtered = positions.filter((p) => p.divisions.name === selected)
  const selectedDivision = positions.find((p) => p.divisions.name === selected)?.divisions

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
                <Trophy className="w-6 h-6 text-yellow-400" />
                <span className="text-sm font-semibold text-purple-300 tracking-wider">
                  TEMPORADA 2024
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">
                <span className="bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Tabla de Posiciones
                </span>
              </h1>
              <p className="text-white/50 text-sm mt-2">
                Seguí la competencia en tiempo real
              </p>
            </div>

            {/* Stats rápidos */}
            <div className="flex gap-4">
              <div className="px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <div className="flex items-center gap-2 text-white/60 text-xs">
                  <Calendar className="w-3 h-3" />
                  <span>En curso</span>
                </div>
              </div>
              <div className="px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <div className="flex items-center gap-2 text-white/60 text-xs">
                  <TrendingUp className="w-3 h-3" />
                  <span>{filtered.length} equipos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="container mx-auto px-4 md:px-6 py-8">
        {/* Tabs de divisiones */}
        <DivisionsTabs
          divisions={divisions}
          selected={selected}
          onChange={setSelected}
        />

        {/* Información de la división seleccionada */}
        {selectedDivision && (
          <div className="mb-6 flex items-center gap-2">
            <div className="w-1 h-6 rounded-full bg-linear-to-b from-purple-400 to-pink-400" />
            <span className="text-sm text-white/40">
              Mostrando {filtered.length} equipos de {selected}
            </span>
          </div>
        )}

        {/* Tabla de posiciones */}
        <DivisionsTable positions={filtered} />

        {/* Leyenda */}
        <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-linear-to-r from-yellow-500 to-amber-500" />
            <span className="text-white/50">Campeón</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-linear-to-r from-gray-400 to-gray-500" />
            <span className="text-white/50">Subcampeón</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-linear-to-r from-orange-500 to-orange-600" />
            <span className="text-white/50">Tercer puesto</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-linear-to-r from-purple-500 to-pink-500" />
            <span className="text-white/50">Resto de equipos</span>
          </div>
        </div>
      </div>
    </div>
  )
}