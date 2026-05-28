import { supabase } from "@/lib/supabase/client"

import { PublicMatch } from "../types/match-public.type"

export async function getPublicMatches(): Promise<PublicMatch[]> {

  const { data, error } = await supabase

    .from("matches")

    .select(`
      id,

      local_score,
      away_score,

      match_date,

      created_at,

      fecha:fechas (
        id,
        name
      ),

      division:divisions (
        id,
        name
      ),

      local_team:teams!matches_local_team_id_fkey (
        id,
        name,
        logo_url
      ),

      away_team:teams!matches_away_team_id_fkey (
        id,
        name,
        logo_url
      )
    `)

    .order("created_at", {
      ascending: true
    })

  if (error) {
    throw new Error(error.message)
  }

  return (data ?? []) as unknown as PublicMatch[]

}