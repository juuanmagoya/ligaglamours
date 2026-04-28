// Tipos base
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

export function canViewTeam(user: User, team: Team): boolean {
  const result =
    user.role === "admin" ||
    (user.role === "leader" && user.team_id === team.id)

  console.log("🔍 canViewTeam", {
    user,
    team,
    result
  })

  return result
}

export function canEditTeam(user: User, team: Team): boolean {
  const result =
    user.role === "admin" ||
    (user.role === "leader" && user.team_id === team.id)

  console.log("🔍 canEditTeam", {
    user,
    team,
    result
  })

  return result
}

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

// 👁️ Puede ver jugadores
export function canViewPlayers(user: User, teamId: string): boolean {
  const result =
    user.role === "admin" ||
    (user.role === "leader" && user.team_id === teamId)

  console.log("🔍 canViewPlayers", {
    userRole: user.role,
    userTeam: user.team_id,
    teamId,
    result
  })

  return result
}

// ⚙️ Puede gestionar jugadores (sin día)
export function canManagePlayers(user: User, teamId: string): boolean {
  const result =
    user.role === "admin" ||
    (user.role === "leader" && user.team_id === teamId)

  console.log("🔍 canManagePlayers", {
    userRole: user.role,
    userTeam: user.team_id,
    teamId,
    match: user.team_id === teamId,
    result
  })

  return result
}

// 📅 Día permitido
export function isWeekend(): boolean {
  const now = new Date()

  // 🔥 timezone Argentina (clave)
  const argentinaDate = new Date(
    now.toLocaleString("en-US", {
      timeZone: "America/Argentina/Buenos_Aires"
    })
  )

  const day = argentinaDate.getDay()

  const result = day === 0 || day === 6

  console.log("📅 isWeekend", {
    serverDate: now,
    argentinaDate,
    day,
    isAllowed: result
  })

  return result
}

// 🧠 REGLA COMPLETA
export function canModifyPlayers(user: User, teamId: string): boolean {

  console.log("🚨 canModifyPlayers START", {
    user,
    teamId
  })

  // ❗ sanity check
  if (user.role === "leader" && !user.team_id) {
    console.log("❌ Leader sin team_id")
    return false
  }

  const canManage = canManagePlayers(user, teamId)

  if (!canManage) {
    console.log("❌ No puede gestionar jugadores")
    return false
  }

  if (user.role === "admin") {
    console.log("✅ Admin bypass total")
    return true
  }

  const weekend = isWeekend()

  console.log("🔍 canModifyPlayers RESULT", {
    canManage,
    weekend,
    final: weekend
  })

  return weekend
}