"use server"

import { createPosition } from "../services/position.service"
import { revalidatePath } from "next/cache"

export async function createPositionAction(formData: FormData) {
  const team_id = formData.get("team_id") as string
  const division_id = formData.get("division_id") as string

  if (!team_id || !division_id) {
    throw new Error("Equipo y división son obligatorios")
  }

  await createPosition({
    team_id,
    division_id,
  })

  revalidatePath("/posiciones")
}