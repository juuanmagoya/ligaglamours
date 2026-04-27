"use server"

import { deleteTeam } from "../services/equipo.service"
import { revalidatePath } from "next/cache"
import { getCurrentUser } from "@/lib/auth/getCurrentUser"

export async function deleteTeamAction(id: string) {

  if (!id) {
    throw new Error("ID de equipo inválido")
  }

  // 🔥 obtener usuario REAL en el server
  const user = await getCurrentUser()

  await deleteTeam(id, user)

  const path =
    user.role === "admin"
      ? "/admin/equipos"
      : "/lider/equipo"

  revalidatePath(path)
}