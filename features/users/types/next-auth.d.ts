import { DefaultSession } from "next-auth"
import { UserRole, UserStatus } from "./user.types"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: UserRole
      status: UserStatus
    } & DefaultSession["user"]
  }

  interface User {
    role: UserRole
    status: UserStatus
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: UserRole
    status: UserStatus
  }
}