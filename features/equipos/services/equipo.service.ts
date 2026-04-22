import { supabase } from "@/lib/supabase/client"
import { Team, CreateTeamDTO, UpdateTeamDTO } from "../types/equipo.type"

export async function getTeams(): Promise<Team[]> {
  const { data, error } = await supabase
    .from("teams")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data as Team[]
}

export async function createTeam(data: CreateTeamDTO) {
  const { error } = await supabase
    .from("teams")
    .insert(data)

  if (error) {
    throw new Error(error.message)
  }
}

export async function updateTeam(
  id: string,
  data: UpdateTeamDTO
) {
  const { error } = await supabase
    .from("teams")
    .update(data)
    .eq("id", id)

  if (error) {
    throw new Error(error.message)
  }
}

export async function deleteTeam(id: string) {
  const { error } = await supabase
    .from("teams")
    .delete()
    .eq("id", id)

  if (error) {
    throw new Error(error.message)
  }
}