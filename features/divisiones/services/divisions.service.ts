import { supabase } from "@/lib/supabase/client"
import { Division, CreateDivisionDTO, UpdateDivisionDTO } from "../types/division.type"

export async function getDivisions(): Promise<Division[]> {
  const { data, error } = await supabase
    .from("divisions")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data as Division[]
}

export async function createDivision(data: CreateDivisionDTO) {
  const { error } = await supabase
    .from("divisions")
    .insert(data)

  if (error) {
    throw new Error(error.message)
  }
}

export async function updateDivision(
  id: string,
  data: UpdateDivisionDTO
) {
  const { error } = await supabase
    .from("divisions")
    .update(data)
    .eq("id", id)

  if (error) {
    throw new Error(error.message)
  }
}

export async function deleteDivision(id: string) {
  const { error } = await supabase
    .from("divisions")
    .delete()
    .eq("id", id)

  if (error) {
    throw new Error(error.message)
  }
}