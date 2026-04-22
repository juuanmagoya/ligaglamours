"use server"

import { deletePosition } from "../services/position.service"
import { revalidatePath } from "next/cache"

export async function deletePositionAction(id: string) {
  if (!id) {
    throw new Error("ID inválido")
  }

  await deletePosition(id)

  revalidatePath("/posiciones")
}