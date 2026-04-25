// Tipos base (ajustalos a tu modelo real)
type Role = "admin" | "leader"

interface User {
  id: string
  role: Role
  team_id?: string | null
}

interface Team {
  id: string
}

/**
 * 🧠 TEAM PERMISSIONS
 */

// Puede ver el equipo
export function canViewTeam(user: User, team: Team): boolean {
  if (user.role === "admin") return true

  return user.role === "leader" && user.team_id === team.id
}

// Puede editar el equipo (a nivel general)
export function canEditTeam(user: User, team: Team): boolean {
  if (user.role === "admin") return true

  return user.role === "leader" && user.team_id === team.id
}

// Qué campos puede editar
export function getEditableTeamFields(user: User): "all" | string[] {
  if (user.role === "admin") return "all"

  if (user.role === "leader") {
    return ["logo_url", "description"]
  }

  return []
}


/**
 * 🧠 PLAYER PERMISSIONS
 */

// Puede ver jugadores
export function canViewPlayers(user: User, teamId: string): boolean {
  if (user.role === "admin") return true

  return user.role === "leader" && user.team_id === teamId
}

// Puede gestionar jugadores (sin considerar día)
export function canManagePlayers(user: User, teamId: string): boolean {
  if (user.role === "admin") return true

  return user.role === "leader" && user.team_id === teamId
}

// Restricción por día (sábado = 6, domingo = 0)
export function isWeekend(): boolean {
  const day = new Date().getDay()
  return day === 0 || day === 6
}

// Puede modificar jugadores (REGLA COMPLETA)
export function canModifyPlayers(user: User, teamId: string): boolean {
  if (!canManagePlayers(user, teamId)) return false

  // Admin puede siempre
  if (user.role === "admin") return true

  // Leader solo fines de semana
  return isWeekend()
}