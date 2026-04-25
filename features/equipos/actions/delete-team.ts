"use server"

import { deleteTeam } from "../services/equipo.service"
import { revalidatePath } from "next/cache"
import { AppUser } from "@/features/users/types/user.types"

export async function deleteTeamAction(
  id: string,
  user: AppUser
) {

  if (!id) {
    throw new Error("ID de equipo inválido")
  }

  await deleteTeam(id, user)

  const path =
    user.role === "admin"
      ? "/admin/teams"
      : "/lider/team"

  revalidatePath(path)
}