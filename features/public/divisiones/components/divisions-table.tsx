import { PositionWithRelations } from "@/features/posiciones/types/position.type"

type DivisionsTableProps = {
  positions: PositionWithRelations[]
}

export function DivisionsTable({ positions }: DivisionsTableProps) {
  // Función para obtener el color según la posición (top 3)
  const getRowStyles = (index: number) => {
    if (index === 0) {
      return {
        bg: "bg-gradient-to-r from-yellow-500/10 via-amber-500/5 to-transparent",
        text: "text-yellow-300",
        border: "border-yellow-500/30",
        badge: "🏆"
      }
    }
    if (index === 1) {
      return {
        bg: "bg-gradient-to-r from-gray-400/10 to-transparent",
        text: "text-gray-300",
        border: "border-gray-400/30",
        badge: "🥈"
      }
    }
    if (index === 2) {
      return {
        bg: "bg-gradient-to-r from-orange-500/10 to-transparent",
        text: "text-orange-300",
        border: "border-orange-500/30",
        badge: "🥉"
      }
    }
    return {
      bg: "hover:bg-purple-500/5",
      text: "text-white/70",
      border: "border-purple-500/10",
      badge: null
    }
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-purple-500/20 bg-[#1a1029]/30 backdrop-blur">
      <table className="w-full">
        {/* Header */}
        <thead className="bg-purple-500/10 border-b border-purple-500/20">
          <tr>
            <th className="px-4 py-4 text-left text-sm font-semibold text-purple-300 w-16">
              #
            </th>
            <th className="px-4 py-4 text-left text-sm font-semibold text-purple-300">
              Equipo
            </th>
            <th className="px-4 py-4 text-center text-sm font-semibold text-purple-300 w-16">
              Pts
            </th>
            <th className="px-4 py-4 text-center text-sm font-semibold text-purple-300 w-14">
              PJ
            </th>
            <th className="px-4 py-4 text-center text-sm font-semibold text-purple-300 w-14">
              G
            </th>
            <th className="px-4 py-4 text-center text-sm font-semibold text-purple-300 w-14">
              E
            </th>
            <th className="px-4 py-4 text-center text-sm font-semibold text-purple-300 w-14">
              P
            </th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {positions.map((p, index) => {
            const styles = getRowStyles(index)
            
            return (
              <tr
                key={p.id}
                className={`group border-t ${styles.bg} ${styles.border} transition-all duration-300 hover:bg-purple-500/10`}
              >
                {/* Posición con badge */}
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-1">
                    {styles.badge && (
                      <span className="text-lg">{styles.badge}</span>
                    )}
                    <span className={`font-semibold ${styles.text}`}>
                      {index + 1}
                    </span>
                  </div>
                </td>

                {/* Equipo */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {/* Avatar/ícono del equipo (placeholder) */}
                    <div className="w-8 h-8 rounded-lg bg-linear-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-sm font-bold text-purple-400">
                      {p.teams.name.charAt(0)}
                    </div>
                    <span className="font-medium text-white group-hover:text-purple-300 transition-colors">
                      {p.teams.name}
                    </span>
                  </div>
                </td>

                {/* Puntos - destacado */}
                <td className="px-4 py-3 text-center">
                  <span className="inline-block px-2 py-1 rounded-lg bg-purple-500/20 text-purple-300 font-bold text-sm">
                    {p.points}
                  </span>
                </td>

                {/* PJ, G, E, P */}
                <td className="px-4 py-3 text-center text-white/60 font-mono text-sm">
                  {p.played}
                </td>
                <td className="px-4 py-3 text-center text-green-400 font-mono text-sm">
                  {p.wins}
                </td>
                <td className="px-4 py-3 text-center text-yellow-400 font-mono text-sm">
                  {p.draws}
                </td>
                <td className="px-4 py-3 text-center text-red-400 font-mono text-sm">
                  {p.losses}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {/* Footer con estadísticas */}
      {positions.length > 0 && (
        <div className="px-4 py-3 border-t border-purple-500/20 bg-purple-500/5">
          <div className="flex justify-between text-xs text-white/40">
            <span>Total equipos: {positions.length}</span>
            <span>Actualizado al día</span>
          </div>
        </div>
      )}
    </div>
  )
}