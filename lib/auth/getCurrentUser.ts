import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"

import { supabase } from "@/lib/supabase/client"

import { AppUser } from "@/features/users/types/user.types"

export async function getCurrentUser():
Promise<AppUser> {

  const session =
    await getServerSession(authOptions)

  if (!session?.user?.id) {
    throw new Error("No autenticado")
  }

  const { data, error } =
    await supabase
      .from("users")
      .select(`
        id,
        name,
        email,
        role,
        status,
        team_id
      `)
      .eq("id", session.user.id)
      .single()

  if (error || !data) {
    throw new Error(
      "Usuario no encontrado"
    )
  }

  return data as AppUser
}