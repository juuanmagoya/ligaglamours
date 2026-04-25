import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { supabase } from "@/lib/supabase/client"
import { AppUser } from "@/features/users/types/user.types"

export async function getCurrentUser(): Promise<AppUser> {

  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    throw new Error("No autenticado")
  }

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", session.user.email)
    .single()

  if (error || !data) {
    throw new Error("Usuario no encontrado")
  }

  return data as AppUser
}