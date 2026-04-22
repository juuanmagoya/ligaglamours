import { supabase } from "@/lib/supabase/client"
import { Leader, CreateLeaderDTO, UpdateLeaderDTO } from "../types/leader.type"

export async function getLeaders(): Promise<Leader[]> {

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("role", "leader")
    .order("created_at", { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data as Leader[]
}

export async function createLeader(data: CreateLeaderDTO) {

  const { error } = await supabase
    .from("users")
    .insert({
      ...data,
      role: "leader",
      status: "inactive"
    })

  if (error) {
    throw new Error(error.message)
  }

}

export async function updateLeader(
  id: string,
  data: UpdateLeaderDTO
) {

  const { error } = await supabase
    .from("users")
    .update(data)
    .eq("id", id)
    .eq("role", "leader")

  if (error) {
    throw new Error(error.message)
  }

}

export async function deleteLeader(id: string) {

  const { error } = await supabase
    .from("users")
    .delete()
    .eq("id", id)
    .eq("role", "leader")

  if (error) {
    throw new Error(error.message)
  }

}