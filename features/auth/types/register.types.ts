
export interface CreateLeaderData {
  name: string
  email: string
  password: string
  team_id?: string | null
}

export interface RegisterActionResponse {
  success?: boolean
  error?: string
  message?: string
}

export interface RegisterLeaderFormProps {
  teams: {
    id: string
    name: string
  }[]
}