"use server"

import { updatePosition } from "../services/position.service"
import { revalidatePath } from "next/cache"

export async function updatePositionAction(
  id: string,
  formData: FormData
) {
  if (!id) {
    throw new Error("ID de posición requerido")
  }

  const wins = formData.get("wins") ? Number(formData.get("wins")) : undefined
  const draws = formData.get("draws") ? Number(formData.get("draws")) : undefined
  const losses = formData.get("losses") ? Number(formData.get("losses")) : undefined

  await updatePosition(id, {
    wins,
    draws,
    losses,
  })

  revalidatePath("/posiciones")
}