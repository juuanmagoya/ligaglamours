"use server"

import { revalidatePath } from "next/cache"

import { updateMatch } from "../services/matches.service"

export async function updateMatchAction(
  id: string,
  formData: FormData
) {

  const fecha_id = formData.get("fecha_id") as string

  const division_id = formData.get("division_id") as string

  const local_team_id = formData.get("local_team_id") as string

  const away_team_id = formData.get("away_team_id") as string

  const local_score = formData.get("local_score")
  const away_score = formData.get("away_score")

  const match_date = formData.get("match_date") as string

  if (!id) {
    throw new Error("ID inválido")
  }

  await updateMatch(id, {

    fecha_id,

    division_id,

    local_team_id,

    away_team_id,

    local_score:
      local_score !== null && local_score !== ""
        ? Number(local_score)
        : null,

    away_score:
      away_score !== null && away_score !== ""
        ? Number(away_score)
        : null,

    match_date: match_date || null

  })

  revalidatePath("/admin/enfrentamientos")

}