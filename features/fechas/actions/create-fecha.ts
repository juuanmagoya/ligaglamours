"use server"

import { revalidatePath } from "next/cache"

import { createFecha } from "../services/fecha.service"

export async function createFechaAction(
  formData: FormData
) {

  const name = formData.get("name") as string

  if (!name) {
    throw new Error("El nombre es obligatorio")
  }

  await createFecha({
    name
  })

  revalidatePath("/admin/fechas")

}