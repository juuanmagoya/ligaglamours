"use client"

import Image from "next/image"

import { PublicMatch } from "../types/match-public.type"

type Props = {
  match: PublicMatch
}

export function PublicMatchCard({
  match
}: Props) {

  const hasResult =
    match.local_score !== null &&
    match.away_score !== null

  return (
    <div
      className="
        relative overflow-hidden

        rounded-2xl

        border border-purple-400/30

        bg-linear-to-br
        from-[#1f1235]
        to-[#140b24]

        backdrop-blur

        p-4 md:p-5

        transition-all duration-300

        hover:border-purple-400/60
        hover:shadow-2xl
        hover:shadow-purple-500/20
        hover:scale-[1.02]
      "
    >

      {/* Glow */}
      <div className="
        absolute inset-0

        bg-linear-to-r
        from-purple-500/15
        via-pink-500/10
        to-cyan-500/10

        opacity-0
        hover:opacity-100

        transition-opacity
      " />

      <div
        className="
          relative z-10

          flex items-center
          justify-between

          gap-2 md:gap-4
        "
      >

        {/* LOCAL */}
        <div
          className="
            flex flex-1
            items-center gap-2 md:gap-3

            min-w-0
          "
        >

          <div
            className="
              relative

              w-10 h-10
              md:w-14 md:h-14

              shrink-0
            "
          >

            {match.local_team?.logo_url ? (

              <Image
                src={match.local_team.logo_url}
                alt={match.local_team.name}
                fill
                className="object-contain"
              />

            ) : (

              <div
                className="
                  w-full h-full

                  rounded-full

                  bg-purple-500/20

                  flex items-center
                  justify-center

                  text-white font-bold
                "
              >
                {match.local_team?.name?.charAt(0)}
              </div>

            )}

          </div>

          <div className="min-w-0">

            <h3
              className="
                text-sm md:text-base

                text-white
                font-semibold

                leading-tight
                break-words
              "
            >
              {match.local_team?.name}
            </h3>

          </div>

        </div>

        {/* SCORE */}
        <div
          className="
            flex flex-col
            items-center justify-center

            min-w-[70px]
            md:min-w-[90px]
          "
        >

          {hasResult ? (

            <div
              className="
                text-xl md:text-3xl

                font-black
                text-white

                tracking-wider
              "
            >

              {match.local_score}

              <span className="mx-1 md:mx-2 text-purple-400">
                -
              </span>

              {match.away_score}

            </div>

          ) : (

            <div
              className="
                text-lg md:text-xl

                font-bold

                text-purple-300
              "
            >
              VS
            </div>

          )}

          {match.match_date && (

            <span
              className="
                text-[10px]
                md:text-xs

                text-white/40

                mt-1
              "
            >
              {new Date(
                match.match_date
              ).toLocaleDateString()}
            </span>

          )}

        </div>

        {/* AWAY */}
        <div
          className="
            flex flex-1
            items-center justify-end

            gap-2 md:gap-3

            min-w-0
          "
        >

          <div
            className="
              min-w-0
              text-right
            "
          >

            <h3
              className="
                text-sm md:text-base

                text-white
                font-semibold

                leading-tight
                break-words
              "
            >
              {match.away_team?.name}
            </h3>

          </div>

          <div
            className="
              relative

              w-10 h-10
              md:w-14 md:h-14

              shrink-0
            "
          >

            {match.away_team?.logo_url ? (

              <Image
                src={match.away_team.logo_url}
                alt={match.away_team.name}
                fill
                className="object-contain"
              />

            ) : (

              <div
                className="
                  w-full h-full

                  rounded-full

                  bg-purple-500/20

                  flex items-center
                  justify-center

                  text-white font-bold
                "
              >
                {match.away_team?.name?.charAt(0)}
              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  )
}