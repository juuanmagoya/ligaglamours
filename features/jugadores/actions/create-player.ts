"use server"

import { createPlayer } from "../services/player.service"
import { revalidatePath } from "next/cache"
import { AppUser } from "@/features/users/types/user.types"

export async function createPlayerAction(
  formData: FormData,
  user: AppUser
) {

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
      : "/lider/players"

  revalidatePath(path)
}