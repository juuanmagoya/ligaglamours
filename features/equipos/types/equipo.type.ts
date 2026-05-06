//Type para la gestion interna de equipos, con toda la informacion necesaria para las operaciones CRUD

export type Team = {
  id: string
  name: string
  slug: string
  logo_url: string | null
  description: string | null
  division_id: string
  created_at: string
  updated_at: string
}

export type CreateTeamDTO = {
  name: string
  slug: string
  logo_url?: string
  description?: string
  division_id: string
}

export type UpdateTeamDTO = {
  name?: string
  slug?: string
  logo_url?: string
  description?: string
  division_id?: string
}
//Type para la pagina publica de equipos, con las relaciones necesarias para mostrar la informacion requerida
export type TeamWithRelations = {
  id: string
  name: string
  logo_url: string | null

  divisions: {
    name: string
  }[] // ✅ array SIEMPRE

  players: {
    id: string
    nickname: string
    id_game: string | null
  }[]
}