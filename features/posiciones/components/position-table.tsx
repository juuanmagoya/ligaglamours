import { Position } from "../types/position.type"
import { PositionRow } from "./position-row"

type Props = {
  positions: Position[]
  teams: { id: string; name: string }[]
  divisions: { id: string; name: string }[]
}

export function PositionTable({ positions, teams, divisions }: Props) {
  
  // Ordenar posiciones por puntos (mayor a menor) y luego por diferencia de goles si quieres
  const sortedPositions = [...positions].sort((a, b) => {
    // Primero por puntos
    if (a.points !== b.points) {
      return b.points - a.points
    }
    // Si hay empate en puntos, podrías ordenar por diferencia de goles
    // Por ahora, por victorias
    return b.wins - a.wins
  })

  // Agrupar por división si quieres mostrar separados
  const positionsByDivision = divisions.map(division => ({
    division,
    positions: sortedPositions.filter(p => p.division_id === division.id)
  }))

  return (
    <div className="space-y-6">
      
      {/* Si quieres mostrar por división */}
      {positionsByDivision.map(({ division, positions: divisionPositions }) => (
        divisionPositions.length > 0 && (
          <div key={division.id} className="rounded-xl border border-purple-200 bg-white/80 backdrop-blur overflow-hidden">
            
            {/* Título de la división */}
            <div className="bg-purple-800 text-white px-4 py-2">
              <h2 className="font-bold text-lg">{division.name}</h2>
            </div>

            <table className="w-full text-sm">
              <thead className="bg-purple-100 text-purple-900">
                <tr>
                  <th className="p-4 text-left w-16">#</th>
                  <th className="p-4 text-left">Equipo</th>
                  <th className="p-4 text-left hidden md:table-cell">División</th>
                  <th className="p-4 text-center">PJ</th>
                  <th className="p-4 text-center">PG</th>
                  <th className="p-4 text-center">PE</th>
                  <th className="p-4 text-center">PP</th>
                  <th className="p-4 text-center">PTS</th>
                  <th className="p-4 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {divisionPositions.map((position, index) => (
                  <PositionRow
                    key={position.id}
                    position={position}
                    teams={teams}
                    divisions={divisions}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )
      ))}

      {/* Si prefieres mostrar todo junto sin agrupar */}
      {positionsByDivision.every(({ positions }) => positions.length === 0) && (
        <div className="rounded-xl border border-purple-200 bg-white/80 backdrop-blur">
          <table className="w-full text-sm">
            <thead className="bg-purple-100 text-purple-900">
              <tr>
                <th className="p-4 text-left w-16">#</th>
                <th className="p-4 text-left">Equipo</th>
                <th className="p-4 text-left hidden md:table-cell">División</th>
                <th className="p-4 text-center">PJ</th>
                <th className="p-4 text-center">PG</th>
                <th className="p-4 text-center">PE</th>
                <th className="p-4 text-center">PP</th>
                <th className="p-4 text-center">PTS</th>
                <th className="p-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {sortedPositions.map((position, index) => (
                <PositionRow
                  key={position.id}
                  position={position}
                  teams={teams}
                  divisions={divisions}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  )
}