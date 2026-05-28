"use client"

type Props = {
  fechas: string[]
  selected: string
  onChange: (fecha: string) => void
}

export function PublicMatchesTabs({
  fechas,
  selected,
  onChange
}: Props) {

  return (
    <div className="
      flex flex-wrap gap-2
      mb-8
    ">

      {fechas.map((fecha) => {

        const isSelected =
          selected === fecha

        return (

          <button
            key={fecha}
            onClick={() => onChange(fecha)}
            className={`
              px-5 py-2.5 rounded-xl
              font-semibold text-sm
              transition-all duration-300

              ${
                isSelected
                  ? `
                    bg-linear-to-r
                    from-purple-500
                    to-pink-500

                    text-white
                    scale-105
                    shadow-lg
                  `
                  : `
                    bg-[#1a1029]/50
                    border border-purple-500/20
                    text-white/60

                    hover:text-white
                    hover:bg-purple-500/20
                  `
              }
            `}
          >
            {fecha}
          </button>

        )

      })}

    </div>
  )
}