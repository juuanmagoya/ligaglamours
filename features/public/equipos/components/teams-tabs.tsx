"use client"

type TeamsTabsProps = {
  divisions: string[]
  selected: string
  onChange: (division: string) => void
}

export function TeamsTabs({
  divisions,
  selected,
  onChange
}: TeamsTabsProps) {
  const getDivisionColor = (division: string, isSelected: boolean) => {
    if (isSelected) {
      if (division.includes("Primera") || division.includes("1ª")) {
        return "from-yellow-500 to-amber-500 text-yellow-300"
      }
      if (division.includes("Segunda") || division.includes("2ª")) {
        return "from-gray-400 to-gray-500 text-gray-300"
      }
      if (division.includes("Tercera") || division.includes("3ª")) {
        return "from-orange-500 to-orange-600 text-orange-300"
      }
      if (division.includes("Cuarta") || division.includes("4ª")) {
        return "from-blue-500 to-blue-600 text-blue-300"
      }
      return "from-purple-500 to-pink-500 text-purple-300"
    }
    return ""
  }

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {divisions.map((div) => {
        const isSelected = selected === div
        const selectedColor = getDivisionColor(div, isSelected)
        
        return (
          <button
            key={div}
            onClick={() => onChange(div)}
            className={`
              relative px-5 py-2.5 rounded-xl font-semibold text-sm
              transition-all duration-300 transform
              ${isSelected 
                ? `bg-linear-to-r ${selectedColor} shadow-lg scale-105` 
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