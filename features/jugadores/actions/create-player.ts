"use server"

import { createPlayer } from "../services/player.service"
import { revalidatePath } from "next/cache"

export async function createPlayerAction(formData: FormData) {

  const id_game = formData.get("id_game") as string
  const nickname = formData.get("nickname") as string
  const team_id = formData.get("team_id") as string

  if (!id_game || !nickname) {
    throw new Error("ID Game y Nickname son obligatorios")
  }

  await createPlayer({
    nickname,
    id_game,
    team_id
  })

  revalidatePath("/admin/players")
}