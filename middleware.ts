import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(req: NextRequest) {

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET
  })

  const { pathname } = req.nextUrl

  // 🔒 Si no está autenticado → login
  if (!token) {
    if (pathname.startsWith("/admin") || pathname.startsWith("/lider")) {
      return NextResponse.redirect(new URL("/login", req.url))
    }
    return NextResponse.next()
  }

  // 🔒 Rutas admin
  if (pathname.startsWith("/admin")) {
    if (token.role !== "admin") {
      return NextResponse.redirect(new URL("/no-autorizado", req.url))
    }
  }

  // 🔒 Rutas líder
  if (pathname.startsWith("/lider")) {
    if (token.role !== "leader") {
      return NextResponse.redirect(new URL("/no-autorizado", req.url))
    }
  }

  return NextResponse.next()
}