"use server"

import { deletePlayer } from "../services/player.service"
import { revalidatePath } from "next/cache"
import { AppUser } from "@/features/users/types/user.types"

export async function deletePlayerAction(
  id: string,
  user: AppUser
) {

  if (!id) {
    throw new Error("ID inválido")
  }

  await deletePlayer(id, user)

  const path =
    user.role === "admin"
      ? "/admin/players"
      : "/lider/players"

  revalidatePath(path)
}