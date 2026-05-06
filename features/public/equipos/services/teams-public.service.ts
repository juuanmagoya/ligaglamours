// teams-public.service.ts
import { supabase } from "@/lib/supabase/client"
import { TeamWithRelations } from "@/features/equipos/types/equipo.type"

export async function getTeamsWithPlayers(): Promise<TeamWithRelations[]> {
  const { data, error } = await supabase
    .from("teams")
    .select(`
      id,
      name,
      logo_url,
      divisions(name),
      players(id, nickname, id_game)
    `)
    .order("name", { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  // Transformar los datos para garantizar que divisions siempre sea un array
  return (data ?? []).map(team => ({
    ...team,
    divisions: team.divisions 
      ? (Array.isArray(team.divisions) ? team.divisions : [team.divisions])
      : []
  })) as TeamWithRelations[]
}