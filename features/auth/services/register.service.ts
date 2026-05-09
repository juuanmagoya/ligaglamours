import { supabase }
from "@/lib/supabase/client"

import {
  DatabaseUser,
} from "../types/account.types"

interface CreateLeaderData {
  name: string
  email: string
  password: string
  team_id?: string | null
}

export async function getUserByEmail(
  email: string
): Promise<DatabaseUser | null> {

  const normalizedEmail = email
    .toLowerCase()
    .trim()

  const { data, error } =
    await supabase
      .from("users")
      .select("*")
      .eq("email", normalizedEmail)
      .maybeSingle()

  if (error) {
    throw new Error(
      `Error al buscar usuario: ${error.message}`
    )
  }

  return data as DatabaseUser | null
}

export async function createLeader(
  data: CreateLeaderData
) {

  const { data: createdUser, error } =
    await supabase
      .from("users")
      .insert({
        name: data.name.trim(),

        email: data.email
          .toLowerCase()
          .trim(),

        password: data.password,

        role: "leader",

        status: "inactive",

        team_id: data.team_id ?? null,
      })

      .select(`
        id,
        name,
        email,
        role,
        status,
        team_id
      `)

      .single()

  if (error) {
    throw new Error(
      `Error al crear líder: ${error.message}`
    )
  }

  return createdUser
}