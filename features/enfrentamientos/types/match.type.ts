export type MatchTeam = {
  id: string
  name: string
  logo_url: string | null
}

export type MatchDivision = {
  id: string
  name: string
}

export type MatchFecha = {
  id: string
  name: string
}

export type Match = {
  id: string

  fecha_id: string
  division_id: string

  local_team_id: string
  away_team_id: string

  local_score: number | null
  away_score: number | null

  match_date: string | null

  created_at: string

  local_team?: MatchTeam
  away_team?: MatchTeam

  division?: MatchDivision
  fecha?: MatchFecha
}

export type CreateMatchDTO = {
  fecha_id: string
  division_id: string

  local_team_id: string
  away_team_id: string

  local_score?: number
  away_score?: number

  match_date?: string
}

export type UpdateMatchDTO = {
  fecha_id?: string
  division_id?: string

  local_team_id?: string
  away_team_id?: string

  local_score?: number | null
  away_score?: number | null

  match_date?: string | null
}