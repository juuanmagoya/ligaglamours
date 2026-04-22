"use server"

import { createLeader } from "../services/leader.service"
import { revalidatePath } from "next/cache"
import bcrypt from "bcryptjs"

export async function createLeaderAction(formData: FormData) {

  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const team_id = formData.get("team_id") as string
  const password = formData.get("password") as string

  if (!name || !email) {
    throw new Error("Nombre y email son obligatorios")
  }

  // si el admin no pone contraseña se genera una
  const rawPassword =
    password || Math.random().toString(36).slice(-8)

  const hashedPassword = await bcrypt.hash(rawPassword, 10)

  await createLeader({
    name,
    email,
    team_id,
    password: hashedPassword
  })

  revalidatePath("/admin/leaders")
}