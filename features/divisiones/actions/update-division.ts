"use server"

import { updateDivision } from "../services/divisions.service"
import { revalidatePath } from "next/cache"

export async function updateDivisionAction(
  id: string,
  formData: FormData
) {
  const name = formData.get("name") as string
  const slug = formData.get("slug") as string
  const description = formData.get("description") as string

  if (!id) {
    throw new Error("ID de división requerido")
  }

  if (!name || !slug) {
    throw new Error("Nombre y slug son obligatorios")
  }

  await updateDivision(id, {
    name,
    slug,
    description,
  })

  revalidatePath("/admin/divisiones")
}