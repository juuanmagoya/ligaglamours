"use server"

import { updatePlayer } from "../services/player.service"
import { revalidatePath } from "next/cache"

export async function updatePlayerAction(
  id: string,
  formData: FormData
) {

  const id_game = formData.get("id_game") as string
  const nickname = formData.get("nickname") as string

  if (!id) {
    throw new Error("ID de jugador requerido")
  }

  if (!id_game || !nickname) {
    throw new Error("ID Game y Nickname son obligatorios")
  }

  await updatePlayer(id, {
    id_game,
    nickname
  })

  revalidatePath("/admin/players")
}