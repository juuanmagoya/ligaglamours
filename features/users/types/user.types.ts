export type UserRole = "admin" | "leader"

export type UserStatus = "active" | "inactive"

export interface AppUser {
  id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
  team_id?: string | null
}