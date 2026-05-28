"use server"

import { revalidatePath } from "next/cache"

import { updateFecha } from "../services/fecha.service"

export async function updateFechaAction(
  id: string,
  formData: FormData
) {

  const name = formData.get("name") as string

  if (!id) {
    throw new Error("ID de fecha requerido")
  }

  if (!name) {
    throw new Error("El nombre es obligatorio")
  }

  await updateFecha(id, {
    name
  })

  revalidatePath("/admin/fechas")

}