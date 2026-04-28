"use server"

import { deletePlayer } from "../services/player.service"
import { revalidatePath } from "next/cache"
import { getCurrentUser } from "@/lib/auth/getCurrentUser"

export async function deletePlayerAction(id: string) {

  const user = await getCurrentUser()

  if (!id) {
    throw new Error("ID inválido")
  }

  await deletePlayer(id, user)

  const path =
    user.role === "admin"
      ? "/admin/players"
      : "/leader/players"

  revalidatePath(path)
}