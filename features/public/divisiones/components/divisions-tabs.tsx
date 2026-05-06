type DivisionsTabsProps = {
  divisions: string[]
  selected: string
  onChange: (value: string) => void
}

export function DivisionsTabs({
  divisions,
  selected,
  onChange
}: DivisionsTabsProps) {
  // Colores para cada división (opcional, según el nombre)
  const getDivisionColor = (division: string) => {
    if (division.includes("Primera") || division.includes("1ª")) {
      return "from-yellow-500/20 to-amber-500/20 border-yellow-500/30 text-yellow-300"
    }
    if (division.includes("Segunda") || division.includes("2ª")) {
      return "from-gray-400/20 to-gray-500/20 border-gray-400/30 text-gray-300"
    }
    if (division.includes("Tercera") || division.includes("3ª")) {
      return "from-orange-500/20 to-orange-600/20 border-orange-500/30 text-orange-300"
    }
    if (division.includes("Cuarta") || division.includes("4ª")) {
      return "from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-300"
    }
    return "from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-300"
  }

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {divisions.map((div) => {
        const isSelected = selected === div
        const colorClass = getDivisionColor(div)
        
        return (
          <button
            key={div}
            onClick={() => onChange(div)}
            className={`
              relative px-5 py-2.5 rounded-xl font-semibold text-sm
              transition-all duration-300 transform
              ${isSelected 
                ? `bg-linear-to-r ${colorClass} shadow-lg scale-105` 
                : "bg-[#1a1029]/50 text-white/60 hover:text-white hover:bg-purple-500/20 border border-purple-500/20"
              }
            `}
          >
            {/* Efecto de glow en el seleccionado */}
            {isSelected && (
              <span className="absolute inset-0 rounded-xl bg-linear-to-r from-purple-500/20 to-transparent blur-md opacity-50" />
            )}
            <span className="relative z-10">{div}</span>
          </button>
        )
      })}
    </div>
  )
}