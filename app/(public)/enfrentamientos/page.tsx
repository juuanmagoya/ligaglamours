// page.tsx

import { Navbar } from "@/features/public/home/components/navbar"

import { getPublicMatches } from "@/features/public/enfrentamientos/services/matches-public.service"

import { PublicMatchesView } from "@/features/public/enfrentamientos/components/public-matches-view"

import { PublicMatch } from "@/features/public/enfrentamientos/types/match-public.type"

// 🔥 Revalidar cada 60 segundos
export const revalidate = 60

export default async function MatchesPage() {

  let matches: PublicMatch[] = []

  try {

    matches = await getPublicMatches()

  } catch (error) {

    console.error(
      "Error fetching matches:",
      error
    )

  }

  return (
    <>

      <Navbar />

      <PublicMatchesView
        matches={matches}
      />

    </>
  )
}