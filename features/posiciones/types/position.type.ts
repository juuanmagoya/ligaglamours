export type Position = {
  id: string

  team_id: string
  division_id: string

  played: number
  wins: number
  draws: number
  losses: number
  points: number

  created_at: string
  updated_at: string
}

export type CreatePositionDTO = {
  team_id: string
  division_id: string
}

export type UpdatePositionDTO = {
  wins?: number
  draws?: number
  losses?: number
}