"use server"

import { createPlayer } from "../services/player.service"
import { revalidatePath } from "next/cache"
import { getCurrentUser } from "@/lib/auth/getCurrentUser"

export async function createPlayerAction(
  formData: FormData
) {
  const user = await getCurrentUser() // 🔥 acá

  const id_game = formData.get("id_game") as string
  const nickname = formData.get("nickname") as string

  if (!id_game || !nickname) {
    throw new Error("ID Game y Nickname son obligatorios")
  }

  let team_id: string | null = null

  if (user.role === "admin") {
    team_id = formData.get("team_id") as string
  }

  await createPlayer(
    {
      nickname,
      id_game,
      team_id
    },
    user
  )

  const path =
    user.role === "admin"
      ? "/admin/players"
      : "/leader/players" // 🔥 ojo typo que tenías

  revalidatePath(path)
}