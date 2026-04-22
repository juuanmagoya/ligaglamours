export type Leader = {
  id: string
  name: string
  email: string
  role: "leader" | "admin"
  status: "active" | "inactive"
  team_id: string | null
  created_at: string
  updated_at: string
}

export type CreateLeaderDTO = {
  name: string
  email: string
  password: string
  team_id: string
}

export type UpdateLeaderDTO = {
  name?: string
  email?: string
  password?: string
  status?: "active" | "inactive"
  team_id?: string
}