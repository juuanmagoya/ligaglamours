import { supabase } from "@/lib/supabase/client"
import { Player, CreatePlayerDTO, UpdatePlayerDTO } from "../types/player.type"
import { canModifyPlayers } from "@/lib/auth/permissions"
import { AppUser } from "@/features/users/types/user.types"

// ✅ GET PLAYERS SEGÚN ROL
export async function getPlayers(user: AppUser): Promise<Player[]> {

  let query = supabase
    .from("players")
    .select("*")
    .order("created_at", { ascending: false })

  // 🔒 Si es líder → solo ve los suyos
  if (user.role === "leader") {
    query = query.eq("team_id", user.team_id!)
  }

  const { data, error } = await query

  if (error) {
    throw new Error(error.message)
  }

  return data as Player[]
}


// ✅ CREATE PLAYER
export async function createPlayer(
  data: CreatePlayerDTO,
  user: AppUser
) {

  // 🔒 Leader no elige team
  if (user.role === "leader") {
    data.team_id = user.team_id!
  }

  if (!canModifyPlayers(user, data.team_id!)) {
    throw new Error("No autorizado para crear jugadores")
  }

  const { error } = await supabase
    .from("players")
    .insert(data)

  if (error) {
    throw new Error(error.message)
  }
}


// ✅ UPDATE PLAYER
export async function updatePlayer(
  id: string,
  data: UpdatePlayerDTO,
  user: AppUser
) {

  const { data: existing, error: fetchError } = await supabase
    .from("players")
    .select("team_id")
    .eq("id", id)
    .single()

  if (fetchError || !existing) {
    throw new Error("Jugador no encontrado")
  }

  // 🔒 líder no puede cambiar de equipo
  if (user.role === "leader") {
    data.team_id = existing.team_id
  }

  if (!canModifyPlayers(user, existing.team_id)) {
    throw new Error("No autorizado para actualizar jugadores")
  }

  const { error } = await supabase
    .from("players")
    .update(data)
    .eq("id", id)

  if (error) {
    throw new Error(error.message)
  }
}


// ✅ DELETE PLAYER
export async function deletePlayer(
  id: string,
  user: AppUser
) {

  const { data: existing, error: fetchError } = await supabase
    .from("players")
    .select("team_id")
    .eq("id", id)
    .single()

  if (fetchError || !existing) {
    throw new Error("Jugador no encontrado")
  }

  if (!canModifyPlayers(user, existing.team_id)) {
    throw new Error("No autorizado para eliminar jugadores")
  }

  const { error } = await supabase
    .from("players")
    .delete()
    .eq("id", id)

  if (error) {
    throw new Error(error.message)
  }
}