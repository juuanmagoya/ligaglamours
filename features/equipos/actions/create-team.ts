"use server"

import { createTeam } from "../services/equipo.service"
import { revalidatePath } from "next/cache"
import { getCurrentUser } from "@/lib/auth/getCurrentUser"

export async function createTeamAction(formData: FormData) {

  const user = await getCurrentUser() // 🔥 CLAVE

  const name = formData.get("name") as string
  const slug = formData.get("slug") as string
  const division_id = formData.get("division_id") as string
  const logo_url = formData.get("logo_url") as string | null
  const description = formData.get("description") as string | null

  if (!name || !slug || !division_id) {
    throw new Error("Nombre, slug y división son obligatorios")
  }

  await createTeam(
    {
      name,
      slug,
      division_id,
      logo_url: logo_url || undefined,
      description: description || undefined
    },
    user
  )

  revalidatePath("/admin/equipos")
}