export type PublicMatch = {

  id: string

  local_score: number | null

  away_score: number | null

  match_date: string | null

  created_at: string

  fecha: {
    id: string
    name: string
  } | null

  division: {
    id: string
    name: string
  } | null

  local_team: {
    id: string
    name: string
    logo_url: string | null
  } | null

  away_team: {
    id: string
    name: string
    logo_url: string | null
  } | null

}