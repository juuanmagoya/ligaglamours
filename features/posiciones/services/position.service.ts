import { supabase } from "@/lib/supabase/client"
import {
  Position,
  CreatePositionDTO,
  UpdatePositionDTO
} from "../types/position.type"

function calculatePlayed(
  wins: number,
  draws: number,
  losses: number
) {
  return wins + draws + losses
}

function calculatePoints(
  wins: number,
  draws: number
) {
  return wins * 3 + draws
}

export async function getPositions(): Promise<Position[]> {

  const { data, error } = await supabase
    .from("table_positions")
    .select(`
      *,
      teams(name),
      divisions(name)
    `)
    .order("points", { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data as Position[]
}

export async function createPosition(data: CreatePositionDTO) {

  const { error } = await supabase
    .from("table_positions")
    .insert({
      team_id: data.team_id,
      division_id: data.division_id
    })

  if (error) {
    throw new Error(error.message)
  }
}

export async function updatePosition(
  id: string,
  data: UpdatePositionDTO
) {

  const { data: current, error: fetchError } = await supabase
    .from("table_positions")
    .select("*")
    .eq("id", id)
    .single()

  if (fetchError) {
    throw new Error(fetchError.message)
  }

  const wins = data.wins ?? current.wins
  const draws = data.draws ?? current.draws
  const losses = data.losses ?? current.losses

  const played = calculatePlayed(wins, draws, losses)
  const points = calculatePoints(wins, draws)

  const { error } = await supabase
    .from("table_positions")
    .update({
      wins,
      draws,
      losses,
      played,
      points
    })
    .eq("id", id)

  if (error) {
    throw new Error(error.message)
  }

}

export async function deletePosition(id: string) {

  const { error } = await supabase
    .from("table_positions")
    .delete()
    .eq("id", id)

  if (error) {
    throw new Error(error.message)
  }

}