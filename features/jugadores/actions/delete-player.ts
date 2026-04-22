"use server"

import { deletePlayer } from "../services/player.service"
import { revalidatePath } from "next/cache"

export async function deletePlayerAction(id: string) {

  if (!id) {
    throw new Error("ID inválido")
  }

  await deletePlayer(id)

  revalidatePath("/admin/players")
}