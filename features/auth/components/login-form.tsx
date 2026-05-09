"use client"

import { getSession, signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Eye, EyeOff, AlertCircle, Shield, Mail, Lock, UserX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [inactiveUser, setInactiveUser] = useState(false)
  const [inactiveUserEmail, setInactiveUserEmail] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setInactiveUser(false)

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false
    })

    setLoading(false)

    // Error de credenciales
    if (res?.error) {
      setError("Email o contraseña incorrectos")
      return
    }

    // 🔥 obtener sesión real para verificar estado
    const session = await getSession()

    // ✅ Verificar si el usuario está activo
    if (session?.user?.status !== "active") {
      setInactiveUser(true)
      setInactiveUserEmail(session?.user?.email || email)
      return
    }

    // Redirigir según rol
    if (session?.user?.role === "admin") {
      router.push("/admin/dashboard")
    } else if (session?.user?.role === "leader") {
      router.push("/lider/equipo")
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header con efecto glass */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-purple-500 to-pink-500 shadow-lg mb-4">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Liga Glamour
        </h1>
        <p className="text-sm text-white/60 mt-2">
          Panel de administración
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* EMAIL */}
        <div className="space-y-2">
          <Label className="text-white/80 text-sm font-medium flex items-center gap-2">
            <Mail className="w-4 h-4 text-purple-400" />
            Correo electrónico
          </Label>
          <Input
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#1a1029]/50 border-purple-500/30 text-white placeholder:text-white/30 h-11 text-base backdrop-blur focus:border-purple-400 transition-all duration-300"
            required
          />
        </div>

        {/* PASSWORD */}
        <div className="space-y-2">
          <Label className="text-white/80 text-sm font-medium flex items-center gap-2">
            <Lock className="w-4 h-4 text-purple-400" />
            Contraseña
          </Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#1a1029]/50 border-purple-500/30 text-white placeholder:text-white/30 h-11 text-base backdrop-blur focus:border-purple-400 transition-all duration-300 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* ERROR DE CREDENCIALES */}
        {error && !inactiveUser && (
          <div className="flex items-center gap-2 text-sm text-red-400 bg-red-950/30 py-2.5 px-3 rounded-lg border border-red-500/20">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* USUARIO INACTIVO - Mensaje de contacto */}
        {inactiveUser && (
          <div className="space-y-3">
            <div className="flex items-start gap-3 text-sm text-yellow-400 bg-yellow-950/30 py-3 px-4 rounded-lg border border-yellow-500/30">
              <UserX className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Cuenta desactivada</p>
                <p className="text-white/70 text-xs mt-1">
                  La cuenta <span className="text-yellow-300">{inactiveUserEmail}</span> no se encuentra activa en este momento.
                </p>
              </div>
            </div>
            
            <div className="bg-purple-950/20 rounded-lg p-4 border border-purple-500/20">
              <h4 className="text-white/80 text-sm font-semibold mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4 text-purple-400" />
                ¿Necesitas ayuda?
              </h4>
              <p className="text-white/50 text-xs mb-3">
                Contactate con un administrador para reactivar tu cuenta o resolver cualquier inconveniente.
              </p>

            </div>

            {/* Botón para reintentar con otra cuenta */}
            <button
              type="button"
              onClick={() => {
                setInactiveUser(false)
                setEmail("")
                setPassword("")
              }}
              className="w-full text-center text-xs text-white/40 hover:text-white transition-colors mt-2"
            >
              ← Intentar con otra cuenta
            </button>
          </div>
        )}

        {/* BUTTON */}
        <Button
          type="submit"
          disabled={loading || inactiveUser}
          className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white h-11 text-base font-semibold rounded-xl shadow-lg shadow-purple-500/20 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Ingresando...
            </span>
          ) : (
            "Ingresar"
          )}
        </Button>

        {/* Link de recuperación (opcional) */}
        <div className="text-center mt-4">
          <a 
            href="#" 
            className="text-xs text-white/40 hover:text-purple-400 transition-colors"
            onClick={(e) => e.preventDefault()}
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </form>
    </div>
  )
}