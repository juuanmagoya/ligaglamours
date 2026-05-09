// features/jugadores/services/player.service.ts
import { supabase } from "@/lib/supabase/client"
import { Player, CreatePlayerDTO, UpdatePlayerDTO } from "../types/player.type"
import { canModifyPlayers } from "@/lib/auth/permissions"
import { AppUser } from "@/features/users/types/user.types"

// ✅ GET PLAYERS CON FILTROS (solo nickname, id_game, team_id)
export async function getPlayers(
  user: AppUser,
  filters?: {
    search?: string
    teamId?: string
  }
): Promise<Player[]> {
  
  let query = supabase
    .from("players")
    .select(`
      *,
      teams (
        id,
        name
      )
    `)
    .order("nickname", { ascending: true })

  // 🔒 Si es líder → solo ve los suyos
  if (user.role === "leader") {
    query = query.eq("team_id", user.team_id!)
  }

  // 🔍 Búsqueda por nickname o ID de juego
  if (filters?.search && filters.search.trim() !== "") {
    const searchTerm = `%${filters.search.trim()}%`
    query = query.or(`nickname.ilike.${searchTerm},id_game.ilike.${searchTerm}`)
  }

  // 🏢 Filtrar por equipo específico
  if (filters?.teamId && filters.teamId !== "all") {
    query = query.eq("team_id", filters.teamId)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error en getPlayers:", error)
    throw new Error(error.message)
  }

  return data as Player[]
}

// ✅ GET ALL PLAYERS (sin filtros)
export async function getAllPlayers(user: AppUser): Promise<Player[]> {
  let query = supabase
    .from("players")
    .select(`
      *,
      teams (
        id,
        name
      )
    `)
    .order("nickname", { ascending: true })

  if (user.role === "leader") {
    query = query.eq("team_id", user.team_id!)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error en getAllPlayers:", error)
    throw new Error(error.message)
  }

  return data as Player[]
}

// ✅ CREATE PLAYER
export async function createPlayer(
  data: CreatePlayerDTO,
  user: AppUser
) {
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