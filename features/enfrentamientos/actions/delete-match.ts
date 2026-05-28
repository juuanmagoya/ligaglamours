"use server"

import { revalidatePath } from "next/cache"

import { deleteMatch } from "../services/matches.service"

export async function deleteMatchAction(
  id: string
) {

  if (!id) {
    throw new Error("ID inválido")
  }

  await deleteMatch(id)

  revalidatePath("/admin/enfrentamientos")

}