"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false
    })

console.log(res)

    setLoading(false)

    if (res?.error) {
      setError("Email o contraseña incorrectos")
      return
    }

    router.push("/admin/dashboard")
  }

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
          Liga Glamour
        </h1>
        <p className="text-sm text-white/80 drop-shadow mt-2">
          Panel de administración
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* EMAIL */}
        <div className="space-y-2">
          <Label className="text-white drop-shadow text-base">Email</Label>
          <Input
            type="email"
            placeholder="admin@liga.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-transparent border-white/40 text-white placeholder:text-white/50 h-12 text-base"
            required
          />
        </div>

        {/* PASSWORD */}
        <div className="space-y-2">
          <Label className="text-white drop-shadow text-base">Contraseña</Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent border-white/40 text-white placeholder:text-white/50 h-12 text-base pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
            >
              {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
            </button>
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div className="text-center text-sm text-red-400 drop-shadow bg-red-950/30 py-2 rounded">
            {error}
          </div>
        )}

        {/* BUTTON */}
        <Button
          type="submit"
          className="w-full bg-purple-600/70 hover:bg-purple-700 text-white h-12 text-base backdrop-blur-sm"
          disabled={loading}
        >
          {loading ? "Ingresando..." : "Ingresar"}
        </Button>

      </form>
    </div>
  )
}