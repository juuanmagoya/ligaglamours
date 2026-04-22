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