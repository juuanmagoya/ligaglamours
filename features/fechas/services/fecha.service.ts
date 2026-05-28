import { supabase } from "@/lib/supabase/client"
import {
  Fecha,
  CreateFechaDTO,
  UpdateFechaDTO,
} from "../types/fecha.type"

export async function getFechas(): Promise<Fecha[]> {
  const { data, error } = await supabase
    .from("fechas")
    .select("*")
    .order("created_at", { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  return data as Fecha[]
}

export async function createFecha(data: CreateFechaDTO) {
  const { error } = await supabase
    .from("fechas")
    .insert(data)

  if (error) {
    throw new Error(error.message)
  }
}

export async function updateFecha(
  id: string,
  data: UpdateFechaDTO
) {
  const { error } = await supabase
    .from("fechas")
    .update(data)
    .eq("id", id)

  if (error) {
    throw new Error(error.message)
  }
}

export async function deleteFecha(id: string) {
  const { error } = await supabase
    .from("fechas")
    .delete()
    .eq("id", id)

  if (error) {
    throw new Error(error.message)
  }
}