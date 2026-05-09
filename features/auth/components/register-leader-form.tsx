"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { 
  User, 
  Mail, 
  Lock, 
  KeyRound, 
  Search, 
  ChevronDown,
  CheckCircle,
  AlertCircle,
  Building2
} from "lucide-react"

import {
  registerSchema,
  RegisterSchema,
} from "../schemas/register.schema"

import {
  RegisterLeaderFormProps,
} from "../types/register.types"

import { useRegister } from "../hooks/use-register"

export function RegisterLeaderForm({ teams }: RegisterLeaderFormProps) {
  const {
    error,
    success,
    isPending,
    handleRegister,
  } = useRegister()

  const [searchTerm, setSearchTerm] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // Filtrar equipos según búsqueda
  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      team_id: "",
    },
  })

  const selectedTeamId = watch("team_id")
  const selectedTeam = teams.find(team => team.id === selectedTeamId)

  async function onSubmit(data: RegisterSchema) {
    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("email", data.email)
    formData.append("password", data.password)
    formData.append("confirmPassword", data.confirmPassword)
    if (data.team_id) {
      formData.append("team_id", data.team_id)
    }
    await handleRegister(formData)
    reset()
    setSearchTerm("")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Nombre completo */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-white flex items-center gap-2">
          <User className="w-4 h-4 text-purple-400" />
          Nombre completo
        </label>
        <input
          type="text"
          placeholder="Ej: Juan Pérez"
          {...register("name")}
          className="w-full rounded-xl border border-gray-600 bg-white/10 backdrop-blur-sm px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        />
        {errors.name && (
          <p className="text-sm text-red-400 flex items-center gap-1 mt-1">
            <AlertCircle className="w-3 h-3" /> {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-white flex items-center gap-2">
          <Mail className="w-4 h-4 text-purple-400" />
          Correo electrónico
        </label>
        <input
          type="email"
          placeholder="correo@ejemplo.com"
          {...register("email")}
          className="w-full rounded-xl border border-gray-600 bg-white/10 backdrop-blur-sm px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        />
        {errors.email && (
          <p className="text-sm text-red-400 flex items-center gap-1 mt-1">
            <AlertCircle className="w-3 h-3" /> {errors.email.message}
          </p>
        )}
      </div>

      {/* Contraseña */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-white flex items-center gap-2">
          <Lock className="w-4 h-4 text-purple-400" />
          Contraseña
        </label>
        <input
          type="password"
          placeholder="••••••••"
          {...register("password")}
          className="w-full rounded-xl border border-gray-600 bg-white/10 backdrop-blur-sm px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        />
        {errors.password && (
          <p className="text-sm text-red-400 flex items-center gap-1 mt-1">
            <AlertCircle className="w-3 h-3" /> {errors.password.message}
          </p>
        )}
        <p className="text-xs text-gray-400 mt-1">Mínimo 6 caracteres</p>
      </div>

      {/* Confirmar contraseña */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-white flex items-center gap-2">
          <KeyRound className="w-4 h-4 text-purple-400" />
          Confirmar contraseña
        </label>
        <input
          type="password"
          placeholder="••••••••"
          {...register("confirmPassword")}
          className="w-full rounded-xl border border-gray-600 bg-white/10 backdrop-blur-sm px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-400 flex items-center gap-1 mt-1">
            <AlertCircle className="w-3 h-3" /> {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Selector de equipo con buscador */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-white flex items-center gap-2">
          <Building2 className="w-4 h-4 text-purple-400" />
          Equipo (opcional)
        </label>
        
        {/* Dropdown personalizado */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center justify-between rounded-xl border border-gray-600 bg-white/10 backdrop-blur-sm px-4 py-2.5 text-white hover:border-purple-400 transition-colors"
          >
            <span className={selectedTeam ? "text-white" : "text-gray-400"}>
              {selectedTeam ? selectedTeam.name : "Seleccionar equipo"}
            </span>
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {isDropdownOpen && (
            <div className="absolute z-10 w-full mt-2 bg-[#1a1a2e] border border-gray-700 rounded-xl shadow-lg overflow-hidden">
              {/* Buscador dentro del dropdown */}
              <div className="p-2 border-b border-gray-700">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar equipo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-700 rounded-lg bg-[#0f0f1a] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>

              {/* Lista de equipos */}
              <div className="max-h-60 overflow-y-auto">
                {/* Opción "Sin equipo" */}
                <button
                  type="button"
                  onClick={() => {
                    setValue("team_id", "")
                    setIsDropdownOpen(false)
                    setSearchTerm("")
                  }}
                  className="w-full px-4 py-2.5 text-left text-gray-400 hover:bg-purple-500/20 transition-colors border-b border-gray-700"
                >
                  📋 Sin equipo
                </button>

                {filteredTeams.length > 0 ? (
                  filteredTeams.map((team) => (
                    <button
                      key={team.id}
                      type="button"
                      onClick={() => {
                        setValue("team_id", team.id)
                        setIsDropdownOpen(false)
                        setSearchTerm("")
                      }}
                      className={`w-full px-4 py-2.5 text-left transition-colors flex items-center justify-between ${
                        selectedTeamId === team.id 
                          ? "bg-purple-500/20 text-purple-300" 
                          : "text-gray-300 hover:bg-purple-500/10"
                      }`}
                    >
                      <span>{team.name}</span>
                      {selectedTeamId === team.id && (
                        <CheckCircle className="w-4 h-4 text-purple-400" />
                      )}
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-center text-gray-500 text-sm">
                    No se encontraron equipos
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <input type="hidden" {...register("team_id")} />
        
        {errors.team_id && (
          <p className="text-sm text-red-400 flex items-center gap-1 mt-1">
            <AlertCircle className="w-3 h-3" /> {errors.team_id.message}
          </p>
        )}
        <p className="text-xs text-gray-400 mt-1">
          Si no seleccionas un equipo, el líder quedará sin asignar
        </p>
      </div>

      {/* Mensajes de error/success */}
      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 backdrop-blur-sm p-3 text-sm text-red-400 flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-xl border border-green-500/30 bg-green-500/10 backdrop-blur-sm p-3 text-sm text-green-400 flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          {success}
        </div>
      )}

      {/* Botón submit */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
      >
        {isPending ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Registrando...
          </span>
        ) : (
          "Registrar líder"
        )}
      </button>
    </form>
  )
}