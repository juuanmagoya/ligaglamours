import { supabase } from "@/lib/supabase/client"
import {
  Team,
  CreateTeamDTO,
  UpdateTeamDTO
} from "../types/equipo.type"
import { AppUser } from "@/features/users/types/user.types"
import { canEditTeam } from "@/lib/auth/permissions"

/**
 * 🔹 GET TEAMS
 */
export async function getTeams(user: AppUser): Promise<Team[]> {

  let query = supabase
    .from("teams")
    .select("*")
    .order("created_at", { ascending: false })

  // 🔒 Leader solo ve su equipo
  if (user.role === "leader") {
    query = query.eq("id", user.team_id)
  }

  const { data, error } = await query

  if (error) {
    throw new Error(error.message)
  }

  return data as Team[]
}

/**
 * 🔹 CREATE TEAM (solo admin)
 */
export async function createTeam(
  data: CreateTeamDTO,
  user: AppUser
) {

  if (user.role !== "admin") {
    throw new Error("No autorizado para crear equipos")
  }

  const { error } = await supabase
    .from("teams")
    .insert(data)

  if (error) {
    throw new Error(error.message)
  }
}

/**
 * 🔹 UPDATE TEAM
 */
export async function updateTeam(
  id: string,
  data: UpdateTeamDTO,
  user: AppUser
) {

  // 🔍 Obtener equipo real
  const { data: existing, error: fetchError } = await supabase
    .from("teams")
    .select("*")
    .eq("id", id)
    .single()

  if (fetchError || !existing) {
    throw new Error("Equipo no encontrado")
  }

  // 🔒 Validar acceso
  if (!canEditTeam(user, existing)) {
    throw new Error("No autorizado")
  }

  // 🔥 Leader SOLO puede editar estos campos
  if (user.role === "leader") {
    data = {
      logo_url: data.logo_url,
      description: data.description
    }
  }

  const { error } = await supabase
    .from("teams")
    .update(data)
    .eq("id", id)

  if (error) {
    throw new Error(error.message)
  }
}

/**
 * 🔹 DELETE TEAM (solo admin)
 */
export async function deleteTeam(
  id: string,
  user: AppUser
) {

  if (user.role !== "admin") {
    throw new Error("No autorizado para eliminar equipos")
  }

  const { error } = await supabase
    .from("teams")
    .delete()
    .eq("id", id)

  if (error) {
    throw new Error(error.message)
  }
}