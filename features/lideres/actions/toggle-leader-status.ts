"use server"

import { supabase } from "@/lib/supabase/client"

export async function toggleLeaderStatusAction(id: string) {

  const { data: leader, error: fetchError } = await supabase
    .from("users")
    .select("status")
    .eq("id", id)
    .eq("role", "leader")
    .single()

  if (fetchError) {
    throw new Error("No se pudo obtener el líder")
  }

  const newStatus =
    leader.status === "active"
      ? "inactive"
      : "active"

  const { error } = await supabase
    .from("users")
    .update({ status: newStatus })
    .eq("id", id)
    .eq("role", "leader")

  if (error) {
    throw new Error("No se pudo actualizar el estado")
  }

}