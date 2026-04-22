"use server"

import { deleteTeam } from "../services/equipo.service"

export async function deleteTeamAction(id: string) {
  await deleteTeam(id)
}