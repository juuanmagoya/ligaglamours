import { supabase } from "@/lib/supabase/client"
import { Player, CreatePlayerDTO, UpdatePlayerDTO } from "../types/player.type"

export async function getPlayers(): Promise<Player[]> {

  const { data, error } = await supabase
    .from("players")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data as Player[]
}

export async function createPlayer(data: CreatePlayerDTO) {

  const { error } = await supabase
    .from("players")
    .insert(data)

  if (error) {
    throw new Error(error.message)
  }

}

export async function updatePlayer(
  id: string,
  data: UpdatePlayerDTO
) {

  const { error } = await supabase
    .from("players")
    .update(data)
    .eq("id", id)

  if (error) {
    throw new Error(error.message)
  }

}

export async function deletePlayer(id: string) {

  const { error } = await supabase
    .from("players")
    .delete()
    .eq("id", id)

  if (error) {
    throw new Error(error.message)
  }

}