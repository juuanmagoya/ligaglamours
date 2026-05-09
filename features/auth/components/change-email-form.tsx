"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mail, Lock, Send } from "lucide-react"

import {
  changeEmailSchema,
  type ChangeEmailSchema,
} from "../schemas/change-email.schema"

import {
  ChangeEmailFormProps,
} from "../types/account.types"

import { useAccount } from "../hooks/use-account"

export function ChangeEmailForm({
  userId,
  currentEmail,
}: ChangeEmailFormProps) {
  const {
    error,
    success,
    isPending,
    handleChangeEmail,
  } = useAccount()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangeEmailSchema>({
    resolver: zodResolver(changeEmailSchema),
  })

  async function onSubmit(data: ChangeEmailSchema) {
    const formData = new FormData()
    formData.append("newEmail", data.newEmail)
    formData.append("currentPassword", data.currentPassword)
    await handleChangeEmail(userId, formData)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Email actual
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="email"
            value={currentEmail}
            disabled
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-gray-100 text-gray-500 cursor-not-allowed"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Nuevo email
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="email"
            {...register("newEmail")}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            placeholder="nuevo@email.com"
          />
        </div>
        {errors.newEmail && (
          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
            <span className="text-xs">⚠️</span> {errors.newEmail.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Contraseña actual
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="password"
            {...register("currentPassword")}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            placeholder="••••••••"
          />
        </div>
        {errors.currentPassword && (
          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
            <span className="text-xs">⚠️</span> {errors.currentPassword.message}
          </p>
        )}
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-center gap-2">
          <span>❌</span> {error}
        </div>
      )}

      {success && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-green-600 text-sm flex items-center gap-2">
          <span>✅</span> {success}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
      >
        <Send className="w-4 h-4" />
        {isPending ? "Actualizando..." : "Actualizar email"}
      </button>
    </form>
  )
}