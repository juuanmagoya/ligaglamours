import { supabase } from "@/lib/supabase/client"

export async function uploadTeamLogo(file: File) {

  console.log("📦 archivo recibido:", file)

  const fileExt = file.name.split(".").pop()
  const fileName = `${Date.now()}.${fileExt}`
  const filePath = `logos/${fileName}`

  console.log("📁 path:", filePath)

  const { data, error } = await supabase.storage
    .from("teams")
    .upload(filePath, file)

  if (error) {
    console.error("❌ ERROR SUPABASE:", error)
    throw new Error(error.message) // 🔥 MOSTRAR ERROR REAL
  }

  console.log("✅ upload ok:", data)

  const { data: publicUrlData } = supabase.storage
    .from("teams")
    .getPublicUrl(filePath)

  console.log("🌍 public url:", publicUrlData.publicUrl)

  return publicUrlData.publicUrl
}