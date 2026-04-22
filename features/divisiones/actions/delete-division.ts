"use server"

import { deleteDivision } from "../services/divisions.service"
import { revalidatePath } from "next/cache"

export async function deleteDivisionAction(id: string) {
  if (!id) {
    throw new Error("ID inválido")
  }

  await deleteDivision(id)

  revalidatePath("/admin/divisiones")
}