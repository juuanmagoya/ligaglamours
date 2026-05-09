import { supabase } from "@/lib/supabase/client"

import type {
  UpdateUserProfileData,
  DatabaseUser,
} from "../types/account.types"

import type {
  AppUser,
} from "@/features/users/types/user.types"

export async function getUserById(
  userId: string
): Promise<DatabaseUser> {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single()

  if (error) {
    throw new Error(
      `Error al obtener usuario: ${error.message}`
    )
  }

  return data as DatabaseUser
}

export async function getUserByEmail(
  email: string
): Promise<DatabaseUser | null> {
  const normalizedEmail = email
    .toLowerCase()
    .trim()

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", normalizedEmail)
    .maybeSingle()

  if (error) {
    throw new Error(
      `Error al buscar usuario por email: ${error.message}`
    )
  }

  return data as DatabaseUser | null
}

export async function updateUserProfile(
  userId: string,
  data: UpdateUserProfileData
): Promise<AppUser> {
  const updateData: UpdateUserProfileData = {}

  if (data.name !== undefined) {
    updateData.name = data.name.trim()
  }

  if (data.email !== undefined) {
    updateData.email = data.email
      .toLowerCase()
      .trim()
  }

  if (data.password !== undefined) {
    updateData.password = data.password
  }

  const { data: updatedUser, error } =
    await supabase
      .from("users")
      .update(updateData)
      .eq("id", userId)
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
      `Error al actualizar usuario: ${error.message}`
    )
  }

  return updatedUser as AppUser
}

export async function updateUserName(
  userId: string,
  name: string
): Promise<AppUser> {
  const { data, error } = await supabase
    .from("users")
    .update({
      name: name.trim(),
    })
    .eq("id", userId)
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
      `Error al actualizar nombre: ${error.message}`
    )
  }

  return data as AppUser
}

export async function updateUserEmail(
  userId: string,
  email: string
): Promise<AppUser> {
  const normalizedEmail = email
    .toLowerCase()
    .trim()

  const { data, error } = await supabase
    .from("users")
    .update({
      email: normalizedEmail,
    })
    .eq("id", userId)
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
      `Error al actualizar email: ${error.message}`
    )
  }

  return data as AppUser
}

export async function updateUserPassword(
  userId: string,
  hashedPassword: string
): Promise<AppUser> {
  const { data, error } = await supabase
    .from("users")
    .update({
      password: hashedPassword,
    })
    .eq("id", userId)
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
      `Error al actualizar contraseña: ${error.message}`
    )
  }

  return data as AppUser
}