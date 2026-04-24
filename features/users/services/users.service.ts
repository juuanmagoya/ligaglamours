import { supabase } from "@/lib/supabase/client"

export async function getUserByEmail(email: string) {

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single()

  if (error) return null

  return data
}