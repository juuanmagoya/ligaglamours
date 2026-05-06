// Type base (NO tocar)
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

// DTOs (tampoco se tocan)
export type CreatePositionDTO = {
  team_id: string
  division_id: string
}

export type UpdatePositionDTO = {
  wins?: number
  draws?: number
  losses?: number
}

// ✅ Type para la parte pública (con relaciones)
export type PositionWithRelations = Position & {
  teams: {
    name: string
  }
  divisions: {
    name: string
  }
}