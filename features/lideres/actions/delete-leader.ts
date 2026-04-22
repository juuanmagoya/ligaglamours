"use server"

import { deleteLeader } from "../services/leader.service"
import { revalidatePath } from "next/cache"

export async function deleteLeaderAction(id: string) {

  if (!id) {
    throw new Error("ID inválido")
  }

  await deleteLeader(id)

  revalidatePath("/admin/leaders")
}