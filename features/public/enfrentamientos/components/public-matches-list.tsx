"use client"

import { PublicMatch } from "../types/match-public.type"

import { PublicMatchCard } from "./public-match-card"

type Props = {
  matches: PublicMatch[]
}

const divisionOrder = [
  "Primera",
  "Segunda",
  "Tercera",
  "Cuarta"
]

const getDivisionColor = (
  division: string
) => {

  if (
    division.includes("Primera")
  ) {
    return "text-yellow-300"
  }

  if (
    division.includes("Segunda")
  ) {
    return "text-gray-300"
  }

  if (
    division.includes("Tercera")
  ) {
    return "text-orange-300"
  }

  if (
    division.includes("Cuarta")
  ) {
    return "text-blue-300"
  }

  return "text-purple-300"

}

export function PublicMatchesList({
  matches
}: Props) {

  const grouped = matches.reduce(

    (acc, match) => {

      const divisionName =
        match.division?.name ??
        "Sin división"

      if (!acc[divisionName]) {
        acc[divisionName] = []
      }

      acc[divisionName].push(match)

      return acc

    },

    {} as Record<string, PublicMatch[]>

  )

  const sortedDivisions =
    Object.keys(grouped).sort((a, b) => {

      const indexA =
        divisionOrder.findIndex(
          d => a.includes(d)
        )

      const indexB =
        divisionOrder.findIndex(
          d => b.includes(d)
        )

      if (
        indexA !== -1 &&
        indexB !== -1
      ) {
        return indexA - indexB
      }

      return a.localeCompare(b)

    })

  return (
    <div className="space-y-10">

      {sortedDivisions.map((division) => (

        <section
          key={division}
          className="space-y-4"
        >

          {/* Header */}
          <div
            className="
              flex items-center gap-3
            "
          >

            <div
              className="
                h-[2px] flex-1

                bg-linear-to-r
                from-purple-500
                to-transparent
              "
            />

            <h2
              className={`
                text-xl font-bold
                whitespace-nowrap

                ${getDivisionColor(division)}
              `}
            >
              {division}
            </h2>

            <div
              className="
                h-[2px] flex-1

                bg-linear-to-l
                from-purple-500
                to-transparent
              "
            />

          </div>

          {/* Matches */}
          <div
            className="
              grid gap-4

              md:grid-cols-2
            "
          >

            {grouped[division].map((match) => (

              <PublicMatchCard
                key={match.id}
                match={match}
              />

            ))}

          </div>

        </section>

      ))}

    </div>
  )
}