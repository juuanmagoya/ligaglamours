"use server"

import { updateLeader } from "../services/leader.service"
import { revalidatePath } from "next/cache"

export async function updateLeaderAction(
  id: string,
  formData: FormData
) {

  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const team_id = formData.get("team_id") as string

  if (!id) {
    throw new Error("ID de líder requerido")
  }

  if (!name || !email) {
    throw new Error("Nombre y email son obligatorios")
  }

  await updateLeader(id, {
    name,
    email,
    team_id
  })

  revalidatePath("/admin/leaders")
}