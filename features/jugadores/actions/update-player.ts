"use server"

import { updatePlayer } from "../services/player.service"
import { revalidatePath } from "next/cache"
import { getCurrentUser } from "@/lib/auth/getCurrentUser"

export async function updatePlayerAction(
  id: string,
  formData: FormData
) {
  const user = await getCurrentUser() // 🔥 acá

  const nickname = formData.get("nickname") as string
  const id_game = formData.get("id_game") as string

  let team_id: string | null = null

  if (user.role === "admin") {
    team_id = formData.get("team_id") as string
  }

  await updatePlayer(
    id,
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
      : "/leader/players"

  revalidatePath(path)
}