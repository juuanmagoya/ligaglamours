import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

import { supabase } from "@/lib/supabase/client"
import { UserRole, UserStatus } from "@/features/users/types/user.types"

export const { handlers, auth, signIn, signOut } = NextAuth({

  providers: [
    Credentials({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },

      async authorize(credentials) {

        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const { data: user, error } = await supabase
          .from("users")
          .select("*")
          .eq("email", credentials.email)
          .single()

        if (error || !user) return null

        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isValidPassword) return null

        if (user.status === "inactive") return null

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role as UserRole,
          status: user.status as UserStatus
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

})