export type Player = {
  id: string
  nickname: string
  id_game: string
  team_id: string | null
  created_at: string
  updated_at: string
}

export type CreatePlayerDTO = {
  nickname: string
  id_game: string
  team_id: string | null
}

export type UpdatePlayerDTO = {
  nickname?: string
  id_game?: string
  team_id?: string | null
}