import { AuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

import { supabase } from "@/lib/supabase/client"
import { UserRole, UserStatus } from "@/features/users/types/user.types"

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {}
      },

      async authorize(credentials) {

  console.log("credentials:", credentials)

  if (!credentials?.email || !credentials?.password) {
    console.log("faltan credenciales")
    return null
  }

  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", credentials.email)
    .single()

  console.log("user:", user)
  console.log("error:", error)

  if (!user) {
    console.log("usuario no encontrado")
    return null
  }

  const isValidPassword = await bcrypt.compare(
    credentials.password as string,
    user.password
  )

  console.log("password válida:", isValidPassword)

  if (!isValidPassword) {
    console.log("password incorrecta")
    return null
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status
  }
}
    })
  ],

  session: {
    strategy: "jwt"
  },

  callbacks: {
    async jwt({ token, user }) {

      if (user) {
        token.id = user.id
        token.role = user.role
        token.status = user.status
      }

      return token
    },

    async session({ session, token }) {

      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as UserRole
        session.user.status = token.status as UserStatus
      }

      return session
    }
  }
}