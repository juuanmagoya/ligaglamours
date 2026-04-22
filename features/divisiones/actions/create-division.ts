"use server"

import { createDivision } from "../services/divisions.service"
import { revalidatePath } from "next/cache"

export async function createDivisionAction(formData: FormData) {
  const name = formData.get("name") as string
  const slug = formData.get("slug") as string
  const description = formData.get("description") as string

  if (!name || !slug) {
    throw new Error("Nombre y slug son obligatorios")
  }

  await createDivision({
    name,
    slug,
    description,
  })

  revalidatePath("/admin/divisiones")
}