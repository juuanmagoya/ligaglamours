import { supabase } from "@/lib/supabase/client"

import {
  Match,
  CreateMatchDTO,
  UpdateMatchDTO
} from "../types/match.type"

export async function getMatches(): Promise<Match[]> {

  const { data, error } = await supabase
    .from("matches")
    .select(`
      *,
      
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
    .order("created_at", { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  return data as Match[]
}

export async function createMatch(
  data: CreateMatchDTO
) {

  const { error } = await supabase
    .from("matches")
    .insert(data)

  if (error) {
    throw new Error(error.message)
  }

}

export async function updateMatch(
  id: string,
  data: UpdateMatchDTO
) {

  const { error } = await supabase
    .from("matches")
    .update(data)
    .eq("id", id)

  if (error) {
    throw new Error(error.message)
  }

}

export async function deleteMatch(
  id: string
) {

  const { error } = await supabase
    .from("matches")
    .delete()
    .eq("id", id)

  if (error) {
    throw new Error(error.message)
  }

}