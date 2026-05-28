"use server"

import { revalidatePath } from "next/cache"

import { deleteFecha } from "../services/fecha.service"

export async function deleteFechaAction(
  id: string
) {

  if (!id) {
    throw new Error("ID inválido")
  }

  await deleteFecha(id)

  revalidatePath("/admin/fechas")

}