import { supabase } from "@/lib/supabase/client"
import { Player, CreatePlayerDTO, UpdatePlayerDTO } from "../types/player.type"
import { canModifyPlayers } from "@/lib/auth/permissions"
import { AppUser } from "@/features/users/types/user.types"

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

export async function createPlayer(
  data: CreatePlayerDTO,
  user: AppUser
) {

  // 🔒 Leader no puede elegir team_id
  if (user.role === "leader") {
    data.team_id = user.team_id!
  }

  // 🔒 Validación permisos (incluye fin de semana)
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

export async function updatePlayer(
  id: string,
  data: UpdatePlayerDTO,
  user: AppUser
) {

  // 🔍 Obtener team real del player
  const { data: existing, error: fetchError } = await supabase
    .from("players")
    .select("team_id")
    .eq("id", id)
    .single()

  if (fetchError || !existing) {
    throw new Error("Jugador no encontrado")
  }

  // 🔒 Validar contra team REAL
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